/**
 * Quran Bangla - Premium Quran Reader
 * Features: Font selection, audio playback, bookmarks, translations, search
 */

// ===== State Management =====
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
    isLoading: true,
    isPlaying: false,
    currentAudio: null,
    audioSurah: null
};

// ===== DOM Elements =====
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
    toastMessage: document.getElementById('toast-message'),
    fontSizeBtn: document.getElementById('font-size-btn'),
    fontSizeModal: document.getElementById('font-size-modal'),
    fontSizeDisplay: document.getElementById('font-size-display'),
    fontDecrease: document.getElementById('font-decrease'),
    fontIncrease: document.getElementById('font-increase'),
    fontReset: document.getElementById('font-reset'),
    fontClose: document.getElementById('font-close')
};

// ===== Utility Functions =====
function toBengaliNumber(num) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
}

function toArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arabicDigits[parseInt(d)] || d).join('');
}

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '\n': '<br>'
    };
    return text.replace(/[&<>"'\n]/g, m => map[m]);
}

function showToast(message, duration = 2500) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// ===== Theme Management =====
function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    saveToLocalStorage('quran_theme', state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = elements.themeToggle.querySelector('svg');
    if (state.theme === 'light') {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
    }
}

// ===== Translation Toggle =====
function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    saveToLocalStorage('quran_translation', state.showTranslation);
    elements.translationToggle.classList.toggle('toggle-active', state.showTranslation);
    renderQuranContent();
}

// ===== Language Toggle =====
function toggleLanguage() {
    state.language = state.language === 'bn' ? 'en' : 'bn';
    saveToLocalStorage('quran_language', state.language);
    elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';
}

// ===== Font Size Management =====
function initFontSize() {
    document.documentElement.style.setProperty('--font-size-base', `${state.fontSize}px`);
    elements.fontSizeDisplay.textContent = toBengaliNumber(state.fontSize);
}

function updateFontSize(size) {
    state.fontSize = Math.max(18, Math.min(42, size));
    document.documentElement.style.setProperty('--font-size-base', `${state.fontSize}px`);
    elements.fontSizeDisplay.textContent = toBengaliNumber(state.fontSize);
    saveToLocalStorage('quran_font_size', state.fontSize);
}

function openFontSizeModal() {
    elements.fontSizeModal.classList.remove('hidden');
    elements.fontSizeModal.classList.add('flex');
}

function closeFontSizeModal() {
    elements.fontSizeModal.classList.add('hidden');
    elements.fontSizeModal.classList.remove('flex');
}

// ===== Sidebar Management =====
function toggleSidebar() {
    const isOpen = !elements.sidebar.classList.contains('-translate-x-full');
    elements.sidebar.classList.toggle('-translate-x-full', isOpen);
    elements.sidebarOverlay.classList.toggle('hidden', isOpen);
}

function openMobileSurahSelector() {
    elements.mobileSurahSelector.classList.remove('translate-y-full');
}

function closeMobileSurahSelector() {
    elements.mobileSurahSelector.classList.add('translate-y-full');
}

// ===== Bookmarks Management =====
function openBookmarksModal() {
    renderBookmarks();
    elements.bookmarksModal.classList.remove('hidden');
    elements.bookmarksModal.classList.add('flex');
}

function closeBookmarksModal() {
    elements.bookmarksModal.classList.add('hidden');
    elements.bookmarksModal.classList.remove('flex');
}

function isBookmarked(surahNum, ayahNum) {
    return state.bookmarks.some(b => b.surah === surahNum && b.ayah === ayahNum);
}

function addBookmark(surahNum, ayahNum) {
    if (!isBookmarked(surahNum, ayahNum)) {
        state.bookmarks.push({ surah: surahNum, ayah: ayahNum, timestamp: Date.now() });
        saveToLocalStorage('quran_bookmarks', JSON.stringify(state.bookmarks));
        showToast('বুকমার্ক যোগ করা হয়েছে');
        renderQuranContent(); // Re-render to update bookmark icons
    } else {
        showToast('এই আয়াত ইতিমধ্যে বুকমার্ক করা আছে');
    }
}

function removeBookmark(index, event) {
    event.stopPropagation();
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

    setTimeout(() => {
        const element = document.getElementById(`ayah-${surahNum}-${ayahNum}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('animate-fade-in');
            setTimeout(() => element.classList.remove('animate-fade-in'), 500);
        }
    }, 100);

    if (window.innerWidth < 1024) {
        closeMobileSurahSelector();
    }
}

function renderBookmarks() {
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                <p>কোনো বুকমার্ক নেই</p>
            </div>
        `;
        return;
    }

    elements.bookmarksList.innerHTML = state.bookmarks.map((bookmark, index) => {
        const surah = state.quranData?.surah_names.find(s => s.number === bookmark.surah);
        const surahName = surah ? surah.name_bangla : `সূরা ${bookmark.surah}`;
        return `
            <div class="bookmark-item animate-fade-in" onclick="goToBookmark(${bookmark.surah}, ${bookmark.ayah})">
                <div class="bookmark-info">
                    <div class="bookmark-surah">${surahName}</div>
                    <div class="bookmark-ayah">আয়াত ${toBengaliNumber(bookmark.ayah)}</div>
                </div>
                <button class="remove-bookmark" onclick="removeBookmark(${index}, event)">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

// ===== Copy Functionality =====
function copyAyah(arabic, bangla) {
    const text = `${arabic}\n\n${bangla}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('আয়াত কপি করা হয়েছে');
        }).catch(() => {
            showToast('কপি করতে সমস্যা হয়েছে');
        });
    } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('আয়াত কপি করা হয়েছে');
    }
}

// ===== Surah Navigation =====
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    saveToLocalStorage('quran_current_surah', surahNum);
    saveToLocalStorage('quran_current_ayah', 1);
    renderQuranContent();
    updateSurahListActive();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
        closeMobileSurahSelector();
    } else {
        toggleSidebar();
    }
}

function searchSurah(query) {
    if (!state.quranData) return;

    const q = query.toLowerCase().trim();
    const filtered = state.quranData.surah_names.filter(surah =>
        surah.name_bangla.toLowerCase().includes(q) ||
        surah.name_arabic.includes(query) ||
        surah.number.toString() === query ||
        (q === 'মাক্কী' && surah.type === 'মাক্কী') ||
        (q === 'মাদানী' && surah.type === 'মাদানী')
    );

    elements.surahList.innerHTML = filtered.map(surah => `
        <div class="surah-item ${surah.number === state.currentSurah ? 'active' : ''}"
             onclick="goToSurah(${surah.number})">
            <div class="surah-number">${toBengaliNumber(surah.number)}</div>
            <div class="surah-info">
                <div class="surah-name">${surah.name_bangla}</div>
                <div class="surah-details">${surah.name_arabic} • ${surah.type}</div>
            </div>
            <div class="verse-count">${toBengaliNumber(surah.verses)}</div>
        </div>
    `).join('');
}

function updateSurahListActive() {
    document.querySelectorAll('.surah-item').forEach((item, index) => {
        const surahNum = index + 1;
        item.classList.toggle('active', surahNum === state.currentSurah);
    });
}

// ===== Render Surah List =====
function renderSurahList() {
    if (!state.quranData) return;

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
            <div class="verse-count">${toBengaliNumber(surah.verses)}</div>
        </div>
    `).join('');

    // Mobile Selector
    elements.mobileSurahList.innerHTML = surahs.map(surah => `
        <div class="mobile-surah-item" onclick="goToSurah(${surah.number})">
            <div class="surah-number">${toBengaliNumber(surah.number)}</div>
            <div class="surah-info">
                <div class="surah-name" style="font-weight: 600; color: var(--text-primary)">${surah.name_bangla}</div>
                <div class="surah-details" style="font-size: 0.8125rem; color: var(--text-muted)">${surah.name_arabic} • ${toBengaliNumber(surah.verses)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

// ===== Header Info Update =====
function updateHeaderInfo() {
    const surah = state.quranData?.surah_names.find(s => s.number === state.currentSurah);
    if (surah) {
        elements.currentSurahName.textContent = surah.name_bangla;
        elements.currentAyahDisplay.textContent = `আয়াত ${toBengaliNumber(state.currentAyah)} / ${toBengaliNumber(surah.verses)}`;
    }
}

// ===== Progress Bar =====
function updateProgress() {
    if (!state.quranData) return;

    const currentJuz = state.quranData.juz.find(juz => {
        if (juz.start_surah < state.currentSurah) return true;
        if (juz.start_surah === state.currentSurah && juz.start_ayah <= state.currentAyah) return true;
        return false;
    });

    if (currentJuz) {
        const progress = (currentJuz.number / 30) * 100;
        elements.juzProgress.style.width = `${progress}%`;
    }
}

// ===== Render Quran Content =====
function renderQuranContent() {
    if (!state.quranData) return;

    const surah = state.quranData.surah.find(s => s.number === state.currentSurah);

    if (!surah) {
        elements.quranContent.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p class="loading-text">সূরা লোড হচ্ছে...</p></div>';
        return;
    }

    const arabicClass = state.fontStyle === 'kolkatta' ? 'arabic-kolkatta' : 'arabic-hafizi';

    let html = `
        <div class="surah-header animate-fade-in">
            <div class="surah-name-arabic">${surah.name_arabic}</div>
            <div class="surah-name-bangla">${surah.name_bangla}</div>
            <div class="surah-meta">
                <span class="type-badge">${surah.type}</span>
                <span>•</span>
                <span>${toBengaliNumber(surah.verses)} আয়াত</span>
            </div>
        </div>
    `;

    // Add Bismillah for all surahs except Surah 9 (At-Tawbah)
    if (state.currentSurah !== 9) {
        html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    }

    surah.ayahs.forEach(ayah => {
        const isBookmarked = isBookmarked(surah.number, ayah.number);
        html += `
            <div class="ayah-container ${!state.showTranslation ? 'translation-hidden' : ''}"
                 id="ayah-${surah.number}-${ayah.number}">
                <div class="ayah-actions">
                    <button onclick="addBookmark(${surah.number}, ${ayah.number})"
                            class="${isBookmarked ? 'bookmarked' : ''}"
                            title="বুকমার্ক">
                        <svg class="w-4 h-4" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span class="arabic-num">${toArabicNumber(ayah.number)}</span>
                    <span class="bengali-num">${toBengaliNumber(ayah.number)}</span>
                </div>
                <div class="arabic-text ${arabicClass}">${ayah.text_arabic}</div>
                <div class="bangla-translation">${ayah.text_bangla}</div>
            </div>
        `;
    });

    elements.quranContent.innerHTML = html;
    updateHeaderInfo();
    updateProgress();

    // Save last read position
    saveToLocalStorage('quran_current_surah', state.currentSurah);
    saveToLocalStorage('quran_current_ayah', state.currentAyah);
}

// ===== Page Navigation =====
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

// ===== Event Listeners =====
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
    elements.menuToggle.addEventListener('click', () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            openMobileSurahSelector();
        }
    });
    elements.sidebarOverlay.addEventListener('click', toggleSidebar);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.langToggle.addEventListener('click', toggleLanguage);
    elements.translationToggle.addEventListener('click', toggleTranslation);
    elements.bookmarksBtn.addEventListener('click', openBookmarksModal);
    elements.closeBookmarks.addEventListener('click', closeBookmarksModal);

    // Font Size Modal
    elements.fontSizeBtn?.addEventListener('click', openFontSizeModal);
    elements.fontClose.addEventListener('click', closeFontSizeModal);
    elements.fontDecrease.addEventListener('click', () => updateFontSize(state.fontSize - 2));
    elements.fontIncrease.addEventListener('click', () => updateFontSize(state.fontSize + 2));
    elements.fontReset.addEventListener('click', () => updateFontSize(28));

    // Close modals on outside click
    elements.fontSizeModal.addEventListener('click', (e) => {
        if (e.target === elements.fontSizeModal) closeFontSizeModal();
    });
    elements.bookmarksModal.addEventListener('click', (e) => {
        if (e.target === elements.bookmarksModal) closeBookmarksModal();
    });

    // Mobile Surah Selector
    elements.closeSurahSelector.addEventListener('click', closeMobileSurahSelector);

    // Search
    elements.surahSearch.addEventListener('input', (e) => {
        if (e.target.value.length > 0) {
            searchSurah(e.target.value);
        } else {
            renderSurahList();
        }
    });

    // Initialize toggle states
    elements.translationToggle.classList.toggle('toggle-active', state.showTranslation);
    elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileSurahSelector();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (state.currentPage !== 'reader') return;

        if (e.key === 'Escape') {
            closeFontSizeModal();
            closeBookmarksModal();
            closeMobileSurahSelector();
            if (!elements.sidebar.classList.contains('-translate-x-full')) {
                toggleSidebar();
            }
        }
    });
}

// ===== Initialize Application =====
async function init() {
    try {
        initTheme();
        initFontSize();
        setupEventListeners();

        // Load Quran data
        const response = await fetch('data/quran.json');
        if (!response.ok) throw new Error('Failed to load Quran data');
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
        console.error('Error initializing:', error);
        showToast('ডাটা লোড করতে সমস্যা হয়েছে');
    }
}

// ===== Register Service Worker =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);