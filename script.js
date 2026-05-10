/**
 * Quran Bangla - Main Application
 * Handles all functionality including:
 * - Font selection
 * - Surah navigation
 * - Theme toggle
 * - Translation toggle
 * - Bookmarks
 * - Search
 * - Progress tracking
 */

// State Management
const state = {
    currentPage: 'home',
    fontStyle: localStorage.getItem('quran_font_style') || 'kolkatta',
    theme: localStorage.getItem('quran_theme') || 'dark',
    showTranslation: localStorage.getItem('quran_translation') !== 'false',
    language: localStorage.getItem('quran_language') || 'bn',
    currentSurah: parseInt(localStorage.getItem('quran_current_surah')) || 1,
    currentAyah: parseInt(localStorage.getItem('quran_current_ayah')) || 1,
    bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks') || '[]'),
    fontSize: parseInt(localStorage.getItem('quran_font_size')) || 28,
    quranData: null,
    isLoading: true
};

// DOM Elements
const elements = {
    homePage: document.getElementById('home-page'),
    readerPage: document.getElementById('reader-page'),
    kolkattaBtn: document.getElementById('select-kolkatta'),
    hafiziBtn: document.getElementById('select-hafizi'),
    menuToggle: document.getElementById('menu-toggle'),
    sidebar: document.getElementById('surah-sidebar'),
    sidebarOverlay: document.getElementById('sidebar-overlay'),
    surahList: document.getElementById('surah-list'),
    mobileSurahList: document.getElementById('mobile-surah-list'),
    mobileSurahSelector: document.getElementById('mobile-surah-selector'),
    closeSurahSelector: document.getElementById('close-surah-selector'),
    quranContent: document.getElementById('quran-content'),
    currentSurahName: document.getElementById('current-surah-name'),
    currentAyahDisplay: document.getElementById('current-ayah-display'),
    themeToggle: document.getElementById('theme-toggle'),
    langToggle: document.getElementById('lang-toggle'),
    translationToggle: document.getElementById('translation-toggle'),
    bookmarksBtn: document.getElementById('bookmarks-btn'),
    bookmarksModal: document.getElementById('bookmarks-modal'),
    bookmarksList: document.getElementById('bookmarks-list'),
    closeBookmarks: document.getElementById('close-bookmarks'),
    surahSearch: document.getElementById('surah-search'),
    juzProgress: document.getElementById('juz-progress'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

// Utility Functions
function toBengaliNumber(num) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('');
}

function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicDigits[parseInt(d)]).join('');
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

function showToast(message, duration = 2000) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('toast-show');
    setTimeout(() => {
        elements.toast.classList.remove('toast-show');
    }, duration);
}

// Theme Management
function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    saveToLocalStorage('quran_theme', state.theme);
}

// Translation Toggle
function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    saveToLocalStorage('quran_translation', state.showTranslation);
    elements.translationToggle.classList.toggle('toggle-active', state.showTranslation);
    renderQuranContent();
}

// Language Toggle
function toggleLanguage() {
    state.language = state.language === 'bn' ? 'en' : 'bn';
    saveToLocalStorage('quran_language', state.language);
    elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';
}

// Sidebar Toggle
function toggleSidebar() {
    const isOpen = !elements.sidebar.classList.contains('-translate-x-full');
    elements.sidebar.classList.toggle('-translate-x-full', isOpen);
    elements.sidebarOverlay.classList.toggle('hidden', isOpen);
}

// Mobile Surah Selector
function openMobileSurahSelector() {
    elements.mobileSurahSelector.classList.remove('translate-y-full');
}

function closeMobileSurahSelector() {
    elements.mobileSurahSelector.classList.add('translate-y-full');
}

// Bookmarks Modal
function openBookmarksModal() {
    renderBookmarks();
    elements.bookmarksModal.classList.remove('hidden');
    elements.bookmarksModal.classList.add('flex');
}

function closeBookmarksModal() {
    elements.bookmarksModal.classList.add('hidden');
    elements.bookmarksModal.classList.remove('flex');
}

function addBookmark(surahNum, ayahNum) {
    const exists = state.bookmarks.some(b => b.surah === surahNum && b.ayah === ayahNum);
    if (!exists) {
        state.bookmarks.push({ surah: surahNum, ayah: ayahNum });
        saveToLocalStorage('quran_bookmarks', JSON.stringify(state.bookmarks));
        showToast('বুকমার্ক যোগ করা হয়েছে');
    } else {
        showToast('এই আয়াত ইতিমধ্যে বুকমার্ক করা আছে');
    }
}

function removeBookmark(index) {
    state.bookmarks.splice(index, 1);
    saveToLocalStorage('quran_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
    showToast('বুকমার্ক সরানো হয়েছে');
}

function goToBookmark(surahNum, ayahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = ayahNum;
    saveToLocalStorage('quran_current_surah', surahNum);
    saveToLocalStorage('quran_current_ayah', ayahNum);
    closeBookmarksModal();
    renderQuranContent();
    scrollToAyah(surahNum, ayahNum);
    if (window.innerWidth < 1024) {
        closeMobileSurahSelector();
    } else {
        toggleSidebar();
    }
}

function renderBookmarks() {
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = '<p class="text-center text-dark-muted py-4">কোনো বুকমার্ক নেই</p>';
        return;
    }

    elements.bookmarksList.innerHTML = state.bookmarks.map((bookmark, index) => {
        const surah = state.quranData.surah_names.find(s => s.number === bookmark.surah);
        return `
            <div class="bookmark-item" onclick="goToBookmark(${bookmark.surah}, ${bookmark.ayah})">
                <div class="bookmark-info">
                    <div class="bookmark-surah">${surah ? surah.name_bangla : 'সূরা ' + bookmark.surah}</div>
                    <div class="bookmark-ayah">আয়াত ${toBengaliNumber(bookmark.ayah)}</div>
                </div>
                <button class="remove-bookmark" onclick="event.stopPropagation(); removeBookmark(${index})">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

// Copy Ayah
function copyAyah(arabic, bangla) {
    const text = `${arabic}\n\n${bangla}`;
    navigator.clipboard.writeText(text).then(() => {
        showToast('আয়াত কপি করা হয়েছে');
    }).catch(() => {
        showToast('কপি করতে সমস্যা হয়েছে');
    });
}

// Scroll to specific ayah
function scrollToAyah(surahNum, ayahNum) {
    const element = document.getElementById(`ayah-${surahNum}-${ayahNum}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('fade-in');
        setTimeout(() => element.classList.remove('fade-in'), 500);
    }
}

// Render Surah List
function renderSurahList() {
    const surahs = state.quranData.surah_names;

    // Desktop Sidebar
    elements.surahList.innerHTML = surahs.map(surah => `
        <div class="surah-item ${surah.number === state.currentSurah ? 'active' : ''}"
             onclick="goToSurah(${surah.number})">
            <div class="surah-number">${toBengaliNumber(surah.number)}</div>
            <div class="surah-info">
                <div class="surah-name">${surah.name_bangla}</div>
                <div class="surah-details">${surah.name_arabic}</div>
            </div>
            <div class="verse-count">${toBengaliNumber(surah.verses)} আয়াত</div>
        </div>
    `).join('');

    // Mobile Selector
    elements.mobileSurahList.innerHTML = surahs.map(surah => `
        <div class="mobile-surah-item" onclick="goToSurah(${surah.number}); closeMobileSurahSelector();">
            <div class="surah-number">${toBengaliNumber(surah.number)}</div>
            <div class="surah-info">
                <div class="surah-name">${surah.name_bangla}</div>
                <div class="surah-details">${surah.name_arabic} • ${toBengaliNumber(surah.verses)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

// Go to Surah
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    saveToLocalStorage('quran_current_surah', surahNum);
    saveToLocalStorage('quran_current_ayah', 1);
    renderQuranContent();
    updateSurahListActive();
    scrollToTop();
}

// Search Surah
function searchSurah(query) {
    const filtered = state.quranData.surah_names.filter(surah =>
        surah.name_bangla.toLowerCase().includes(query.toLowerCase()) ||
        surah.name_arabic.includes(query) ||
        surah.number.toString() === query
    );

    elements.surahList.innerHTML = filtered.map(surah => `
        <div class="surah-item ${surah.number === state.currentSurah ? 'active' : ''}"
             onclick="goToSurah(${surah.number}); toggleSidebar();">
            <div class="surah-number">${toBengaliNumber(surah.number)}</div>
            <div class="surah-info">
                <div class="surah-name">${surah.name_bangla}</div>
                <div class="surah-details">${surah.name_arabic}</div>
            </div>
            <div class="verse-count">${toBengaliNumber(surah.verses)} আয়াত</div>
        </div>
    `).join('');
}

function updateSurahListActive() {
    document.querySelectorAll('.surah-item').forEach((item, index) => {
        const surahNum = index + 1;
        item.classList.toggle('active', surahNum === state.currentSurah);
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update Header Info
function updateHeaderInfo() {
    const surah = state.quranData.surah_names.find(s => s.number === state.currentSurah);
    if (surah) {
        elements.currentSurahName.textContent = surah.name_bangla;
        elements.currentAyahDisplay.textContent = `আয়াত ${toBengaliNumber(state.currentAyah)} / ${toBengaliNumber(surah.verses)}`;
    }
}

// Update Progress Bar
function updateProgress() {
    const currentJuz = state.quranData.juz.find(juz => {
        const surah = state.quranData.surah_names.find(s => s.number === state.currentSurah);
        if (!surah) return false;
        if (juz.start_surah < state.currentSurah) return true;
        if (juz.start_surah === state.currentSurah && juz.start_ayah <= state.currentAyah) return true;
        return false;
    });

    if (currentJuz) {
        const progress = (currentJuz.number / 30) * 100;
        elements.juzProgress.style.width = `${progress}%`;
    }
}

// Render Quran Content
function renderQuranContent() {
    const surah = state.quranData.surah.find(s => s.number === state.currentSurah);

    if (!surah) {
        elements.quranContent.innerHTML = '<p class="text-center text-dark-muted">সূরা লোড হচ্ছে...</p>';
        return;
    }

    const arabicClass = state.fontStyle === 'kolkatta' ? 'arabic-kolkatta' : 'arabic-hafizi';

    let html = `
        <div class="surah-header">
            <div class="surah-name-arabic">${surah.name_arabic}</div>
            <div class="surah-name-bangla">${surah.name_bangla}</div>
            <div class="surah-meta">
                ${surah.type} • ${toBengaliNumber(surah.verses)} আয়াত
            </div>
        </div>
    `;

    if (state.currentSurah !== 1) {
        html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    }

    surah.ayahs.forEach(ayah => {
        html += `
            <div class="ayah-container ${!state.showTranslation ? 'translation-hidden' : ''}"
                 id="ayah-${surah.number}-${ayah.number}">
                <div class="ayah-actions">
                    <button onclick="addBookmark(${surah.number}, ${ayah.number})" title="বুকমার্ক">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                    </button>
                    <button onclick="copyAyah('${escapeHtml(ayah.text_arabic)}', '${escapeHtml(ayah.text_bangla)}')" title="কপি">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                    </button>
                </div>
                <div class="verse-number">
                    <span class="arabic-verse-num">${toArabicNumber(ayah.number)}</span>
                    <span class="bengali-num ml-2">${toBengaliNumber(ayah.number)}</span>
                </div>
                <div class="${arabicClass}">${ayah.text_arabic}</div>
                <div class="bangla-translation">${ayah.text_bangla}</div>
            </div>
        `;
    });

    elements.quranContent.innerHTML = html;
    updateHeaderInfo();
    updateProgress();

    // Scroll to last read position after a short delay
    setTimeout(() => {
        if (state.currentAyah > 1) {
            scrollToAyah(state.currentSurah, state.currentAyah);
        }
    }, 100);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Page Navigation
function showHomePage() {
    elements.homePage.classList.remove('hidden');
    elements.readerPage.classList.add('hidden');
    state.currentPage = 'home';
}

function showReaderPage() {
    elements.homePage.classList.add('hidden');
    elements.readerPage.classList.remove('hidden');
    state.currentPage = 'reader';
    initReader();
}

function initReader() {
    if (state.quranData) {
        renderSurahList();
        renderQuranContent();
    }
}

// Event Listeners
function setupEventListeners() {
    // Font Selection
    elements.kolkattaBtn.addEventListener('click', () => {
        state.fontStyle = 'kolkatta';
        saveToLocalStorage('quran_font_style', 'kolkatta');
        showReaderPage();
    });

    elements.hafiziBtn.addEventListener('click', () => {
        state.fontStyle = 'hafizi';
        saveToLocalStorage('quran_font_style', 'hafizi');
        showReaderPage();
    });

    // Header Controls
    elements.menuToggle.addEventListener('click', toggleSidebar);
    elements.sidebarOverlay.addEventListener('click', toggleSidebar);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.langToggle.addEventListener('click', toggleLanguage);
    elements.translationToggle.addEventListener('click', toggleTranslation);
    elements.bookmarksBtn.addEventListener('click', openBookmarksModal);
    elements.closeBookmarks.addEventListener('click', closeBookmarksModal);

    // Mobile Surah Selector
    elements.currentSurahName.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            openMobileSurahSelector();
        } else {
            toggleSidebar();
        }
    });
    elements.closeSurahSelector.addEventListener('click', closeMobileSurahSelector);

    // Search
    elements.surahSearch.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            searchSurah(e.target.value);
        } else {
            renderSurahList();
        }
    });

    // Update translation toggle state
    elements.translationToggle.classList.toggle('toggle-active', state.showTranslation);
    elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileSurahSelector();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (state.currentPage !== 'reader') return;

        if (e.key === 'Escape') {
            if (!elements.bookmarksModal.classList.contains('hidden')) {
                closeBookmarksModal();
            } else if (!elements.mobileSurahSelector.classList.contains('translate-y-full')) {
                closeMobileSurahSelector();
            } else if (!elements.sidebar.classList.contains('-translate-x-full')) {
                toggleSidebar();
            }
        }
    });
}

// Initialize Application
async function init() {
    try {
        initTheme();
        setupEventListeners();

        // Load Quran data
        const response = await fetch('data/quran.json');
        state.quranData = await response.json();
        state.isLoading = false;

        // Check if font is already selected
        const savedFont = localStorage.getItem('quran_font_style');
        if (savedFont) {
            showReaderPage();
        } else {
            showHomePage();
        }
    } catch (error) {
        console.error('Error loading Quran data:', error);
        showToast('ডাটা লোড করতে সমস্যা হয়েছে');
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);