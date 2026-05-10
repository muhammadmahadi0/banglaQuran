/**
 * Quran Bangla - Main Application Script
 * =========================================
 * A premium, production-ready Quran reader with Bangla translation
 * Features: Font selection, bookmarks, translations, search, themes
 *
 * Author: Claude (AI Assistant)
 * License: MIT
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    // Page state
    currentPage: 'home',           // 'home' or 'reader'

    // User preferences (loaded from localStorage)
    fontStyle: localStorage.getItem('quran_font_style') || 'kolkatta',  // 'kolkatta' or 'hafizi'
    theme: localStorage.getItem('quran_theme') || 'dark',              // 'dark' or 'light'
    showTranslation: localStorage.getItem('quran_translation') !== 'false', // boolean
    language: localStorage.getItem('quran_language') || 'bn',           // 'bn' or 'en'
    fontSize: parseInt(localStorage.getItem('quran_font_size')) || 32,  // in pixels

    // Reading position
    currentSurah: parseInt(localStorage.getItem('quran_current_surah')) || 1,
    currentAyah: parseInt(localStorage.getItem('quran_current_ayah')) || 1,

    // Bookmarks
    bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks') || '[]'),

    // Data
    quranData: null
};

// ============================================
// DOM ELEMENTS
// ============================================

// Cache frequently used DOM elements for performance
const elements = {
    // Screens
    loader: document.getElementById('loader'),
    homePage: document.getElementById('home-page'),
    readerPage: document.getElementById('reader-page'),

    // Font selection buttons
    btnKolkatta: document.getElementById('btn-kolkatta'),
    btnHafizi: document.getElementById('btn-hafizi'),

    // Header controls
    btnMenu: document.getElementById('btn-menu'),
    surahTitle: document.getElementById('surah-title'),
    ayahInfo: document.getElementById('ayah-info'),
    btnFontSize: document.getElementById('btn-font-size'),
    btnLang: document.getElementById('btn-lang'),
    btnTheme: document.getElementById('btn-theme'),
    btnTrans: document.getElementById('btn-trans'),
    btnBookmarks: document.getElementById('btn-bookmarks'),
    juzProgress: document.getElementById('juz-progress'),

    // Font size modal
    fontModal: document.getElementById('font-modal'),
    fontDisplay: document.getElementById('font-display'),
    fontMinus: document.getElementById('font-minus'),
    fontPlus: document.getElementById('font-plus'),
    fontReset: document.getElementById('font-reset'),
    fontClose: document.getElementById('font-close'),

    // Sidebar
    sidebar: document.getElementById('sidebar'),
    overlay: document.getElementById('overlay'),
    surahList: document.getElementById('surah-list'),
    searchSurah: document.getElementById('search-surah'),

    // Mobile selector
    mobileSelector: document.getElementById('mobile-selector'),
    mobileList: document.getElementById('mobile-list'),
    closeSelector: document.getElementById('close-selector'),

    // Content
    quranContent: document.getElementById('quran-content'),

    // Bookmarks modal
    bookmarksModal: document.getElementById('bookmarks-modal'),
    bookmarksList: document.getElementById('bookmarks-list'),
    closeBookmarks: document.getElementById('close-bookmarks'),

    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert English number to Bengali number
 * @param {number|string} num - The number to convert
 * @returns {string} Bengali representation
 */
function toBengali(num) {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bnDigits[parseInt(d)] || d).join('');
}

/**
 * Convert English number to Arabic (Eastern Arabic) number
 * @param {number|string} num - The number to convert
 * @returns {string} Arabic representation
 */
function toArabic(num) {
    const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => arDigits[parseInt(d)] || d).join('');
}

/**
 * Save value to localStorage with error handling
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
function save(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn('localStorage error:', e);
    }
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {number} duration - Display duration in ms
 */
function showToast(message, duration = 2500) {
    elements.toastMsg.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), duration);
}

/**
 * Hide the loading screen with animation
 */
function hideLoader() {
    if (elements.loader) {
        elements.loader.classList.add('hidden');
    }
}

// ============================================
// THEME MANAGEMENT
// ============================================

/**
 * Initialize theme based on saved preference
 */
function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-mode');
    }
    updateThemeIcon();
}

/**
 * Toggle between dark and light theme
 */
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    save('quran_theme', state.theme);
    updateThemeIcon();
}

/**
 * Update the theme toggle icon based on current theme
 */
function updateThemeIcon() {
    const icon = elements.btnTheme?.querySelector('svg');
    if (icon) {
        icon.innerHTML = state.theme === 'light'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
    }
}

// ============================================
// TRANSLATION & LANGUAGE
// ============================================

/**
 * Toggle Bangla translation display
 */
function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    save('quran_translation', state.showTranslation);
    elements.btnTrans?.classList.toggle('bg-dark-accent', state.showTranslation);
    elements.btnTrans?.classList.toggle('text-white', state.showTranslation);
    elements.btnTrans?.classList.toggle('text-dark-text', !state.showTranslation);
    renderQuran();
}

/**
 * Toggle UI language between Bangla and English
 */
function toggleLanguage() {
    state.language = state.language === 'bn' ? 'en' : 'bn';
    save('quran_language', state.language);
    elements.btnLang.textContent = state.language === 'bn' ? 'বাং' : 'EN';
}

// ============================================
// FONT SIZE MANAGEMENT
// ============================================

/**
 * Initialize font size from saved preference
 */
function initFontSize() {
    document.documentElement.style.setProperty('--font-size-ar', `${state.fontSize}px`);
    if (elements.fontDisplay) elements.fontDisplay.textContent = toBengali(state.fontSize);
}

/**
 * Update font size with limits
 * @param {number} size - New font size
 */
function updateFontSize(size) {
    state.fontSize = Math.max(18, Math.min(48, size));
    document.documentElement.style.setProperty('--font-size-ar', `${state.fontSize}px`);
    if (elements.fontDisplay) elements.fontDisplay.textContent = toBengali(state.fontSize);
    save('quran_font_size', state.fontSize);
}

/**
 * Open font size adjustment modal
 */
function openFontModal() {
    elements.fontModal.classList.remove('hidden');
    elements.fontModal.classList.add('flex');
}

/**
 * Close font size adjustment modal
 */
function closeFontModal() {
    elements.fontModal.classList.add('hidden');
    elements.fontModal.classList.remove('flex');
}

// ============================================
// SIDEBAR & MODALS
// ============================================

/**
 * Toggle desktop sidebar
 */
function toggleSidebar() {
    const isClosed = elements.sidebar.classList.contains('-translate-x-full');
    elements.sidebar.classList.toggle('-translate-x-full', !isClosed);
    elements.overlay.classList.toggle('hidden', !isClosed);
}

/**
 * Open mobile surah selector
 */
function openMobileSelector() {
    elements.mobileSelector.classList.remove('translate-y-full');
}

/**
 * Close mobile surah selector
 */
function closeMobileSelector() {
    elements.mobileSelector.classList.add('translate-y-full');
}

/**
 * Open bookmarks modal
 */
function openBookmarksModal() {
    renderBookmarks();
    elements.bookmarksModal.classList.remove('hidden');
    elements.bookmarksModal.classList.add('flex');
}

/**
 * Close bookmarks modal
 */
function closeBookmarksModal() {
    elements.bookmarksModal.classList.add('hidden');
    elements.bookmarksModal.classList.remove('flex');
}

// ============================================
// BOOKMARKS
// ============================================

/**
 * Check if an ayah is bookmarked
 * @param {number} surahNum - Surah number
 * @param {number} ayahNum - Ayah number
 * @returns {boolean}
 */
function isBookmarked(surahNum, ayahNum) {
    return state.bookmarks.some(b => b.surah === surahNum && b.ayah === ayahNum);
}

/**
 * Add bookmark for current ayah
 * @param {number} surahNum - Surah number
 * @param {number} ayahNum - Ayah number
 */
function addBookmark(surahNum, ayahNum) {
    if (!isBookmarked(surahNum, ayahNum)) {
        state.bookmarks.push({ surah: surahNum, ayah: ayahNum, time: Date.now() });
        save('quran_bookmarks', JSON.stringify(state.bookmarks));
        showToast('বুকমার্ক যোগ করা হয়েছে');
        renderQuran(); // Re-render to update bookmark icons
    } else {
        showToast('আগে থেকেই বুকমার্ক করা আছে');
    }
}

/**
 * Remove a bookmark by index
 * @param {number} index - Bookmark index
 * @param {Event} event - Click event
 */
function removeBookmark(index, event) {
    event.stopPropagation();
    state.bookmarks.splice(index, 1);
    save('quran_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
    showToast('বুকমার্ক সরানো হয়েছে');
}

/**
 * Navigate to a bookmarked position
 * @param {number} surahNum - Surah number
 * @param {number} ayahNum - Ayah number
 */
function goToBookmark(surahNum, ayahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = ayahNum;
    save('quran_current_surah', surahNum);
    save('quran_current_ayah', ayahNum);
    closeBookmarksModal();
    renderQuran();
    setTimeout(() => {
        const el = document.getElementById(`ayah-${surahNum}-${ayahNum}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('animate-fade-in');
            setTimeout(() => el.classList.remove('animate-fade-in'), 500);
        }
    }, 100);
    if (window.innerWidth < 1024) closeMobileSelector();
}

/**
 * Render bookmarks list
 */
function renderBookmarks() {
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 text-dark-muted">
                <svg class="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                <p>কোনো বুকমার্ক নেই</p>
            </div>`;
        return;
    }

    elements.bookmarksList.innerHTML = state.bookmarks.map((b, i) => {
        const surah = QURAN_DATA.surahNames.find(s => s.number === b.surah);
        return `
            <div class="flex items-center justify-between p-3 bg-dark-card rounded-lg cursor-pointer hover:bg-dark-highlight/30" onclick="goToBookmark(${b.surah}, ${b.ayah})">
                <div>
                    <div class="font-semibold">${surah?.name || 'সূরা ' + b.surah}</div>
                    <div class="text-sm text-dark-muted">আয়াত ${toBengali(b.ayah)}</div>
                </div>
                <button class="p-2 text-dark-muted hover:text-red-500" onclick="removeBookmark(${i}, event)">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>`;
    }).join('');
}

// ============================================
// COPY FUNCTIONALITY
// ============================================

/**
 * Copy ayah text to clipboard
 * @param {string} arabic - Arabic text
 * @param {string} bangla - Bangla translation
 */
function copyAyah(arabic, bangla) {
    const text = `${arabic}\n\n${bangla}`;
    navigator.clipboard?.writeText(text)
        .then(() => showToast('আয়াত কপি হয়েছে'))
        .catch(() => showToast('কপি ব্যর্থ'));
}

// ============================================
// SURAH NAVIGATION
// ============================================

/**
 * Navigate to a specific surah
 * @param {number} surahNum - Surah number to navigate to
 */
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    save('quran_current_surah', surahNum);
    save('quran_current_ayah', 1);
    renderQuran();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close appropriate panel based on screen size
    if (window.innerWidth < 1024) {
        closeMobileSelector();
    } else {
        toggleSidebar();
    }
}

/**
 * Search surah by name
 * @param {string} query - Search query
 */
function searchSurah(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSurahList();
        return;
    }

    const filtered = QURAN_DATA.surahNames.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.arabic.includes(query) ||
        s.number.toString() === query
    );

    elements.surahList.innerHTML = filtered.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1 min-w-0">
                <div class="font-semibold truncate">${s.name}</div>
                <div class="text-xs text-dark-muted truncate">${s.arabic}</div>
            </div>
            <div class="text-xs text-dark-muted">${toBengali(s.ayahs)}</div>
        </div>
    `).join('');
}

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render the surah list in sidebar and mobile selector
 */
function renderSurahList() {
    // Desktop sidebar
    elements.surahList.innerHTML = QURAN_DATA.surahNames.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1 min-w-0">
                <div class="font-semibold truncate">${s.name}</div>
                <div class="text-xs text-dark-muted truncate">${s.arabic}</div>
            </div>
            <div class="text-xs text-dark-muted">${toBengali(s.ayahs)}</div>
        </div>
    `).join('');

    // Mobile selector
    elements.mobileList.innerHTML = QURAN_DATA.surahNames.map(s => `
        <div class="flex items-center gap-3 p-3 bg-dark-card rounded-lg cursor-pointer hover:bg-dark-highlight/30" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1">
                <div class="font-semibold">${s.name}</div>
                <div class="text-xs text-dark-muted">${s.arabic} • ${toBengali(s.ayahs)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

/**
 * Update header with current surah info
 */
function updateHeader() {
    const surah = QURAN_DATA.surahNames.find(s => s.number === state.currentSurah);
    if (elements.surahTitle) elements.surahTitle.textContent = surah?.name || '';
    if (elements.ayahInfo) elements.ayahInfo.textContent = `আয়াত ${toBengali(state.currentAyah)} / ${toBengali(surah?.ayahs || 0)}`;
}

/**
 * Update progress bar (Juz indicator)
 */
function updateProgress() {
    const juz = QURAN_DATA.juzList?.find(j => {
        if (j.end.surah < state.currentSurah) return true;
        if (j.end.surah === state.currentSurah && j.end.ayah <= state.currentAyah) return true;
        return false;
    });
    if (juz && elements.juzProgress) {
        elements.juzProgress.style.width = `${(juz.number / 30) * 100}%`;
    }
}

/**
 * Render the main Quran content
 */
function renderQuran() {
    // Find current surah in data
    const surah = QURAN_DATA.surahahs.find(s => s.number === state.currentSurah);

    if (!surah) {
        elements.quranContent.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-dark-muted">
                <p>সূরা পাওয়া যায়নি</p>
            </div>`;
        return;
    }

    // Determine which Arabic font to use
    const arabicClass = state.fontStyle === 'kolkatta' ? 'arabic-kolkatta' : 'arabic-hafizi';

    // Build HTML
    let html = `
        <!-- Surah Header -->
        <div class="surah-header animate-fade-in">
            <div class="surah-name-ar">${surah.arabicName}</div>
            <div class="surah-name-bn">${surah.name}</div>
            <div class="surah-meta">
                <span class="px-2 py-1 bg-dark-card rounded-full">${surah.type}</span>
                <span class="mx-2">•</span>
                <span>${toBengali(surah.ayahCount)} আয়াত</span>
            </div>
        </div>
    `;

    // Bismillah for all surahs except Surah 9 (At-Tawbah)
    if (state.currentSurah !== 9) {
        html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    }

    // Render each ayah
    surah.ayahs.forEach(ayah => {
        const bookmarked = isBookmarked(surah.number, ayah.number);
        html += `
            <div class="ayah-card ${state.showTranslation ? '' : 'translation-hidden'}" id="ayah-${surah.number}-${ayah.number}">
                <!-- Action buttons -->
                <div class="ayah-actions">
                    <button onclick="addBookmark(${surah.number}, ${ayah.number})" class="${bookmarked ? 'bookmarked' : ''}" title="বুকমার্ক">
                        <svg class="w-4 h-4" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                    </button>
                    <button onclick="copyAyah('${escapeHtml(ayah.arabic)}', '${escapeHtml(ayah.bangla)}')" title="কপি">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                    </button>
                </div>

                <!-- Verse number -->
                <div class="verse-num">
                    <span class="ar-num">${toArabic(ayah.number)}</span>
                    <span class="bn-num">${toBengali(ayah.number)}</span>
                </div>

                <!-- Arabic text -->
                <div class="arabic-text ${arabicClass}">${ayah.arabic}</div>

                <!-- Bangla translation -->
                <div class="bangla-trans">${ayah.bangla}</div>
            </div>
        `;
    });

    elements.quranContent.innerHTML = html;

    // Update header and progress
    updateHeader();
    updateProgress();

    // Save reading position
    save('quran_current_surah', state.currentSurah);
    save('quran_current_ayah', state.currentAyah);
}

// ============================================
// PAGE NAVIGATION
// ============================================

/**
 * Show the home page (font selection)
 */
function showHomePage() {
    elements.homePage.classList.remove('hidden');
    elements.readerPage.classList.add('hidden');
    state.currentPage = 'home';
}

/**
 * Show the reader page
 */
function showReaderPage() {
    elements.homePage.classList.add('hidden');
    elements.readerPage.classList.remove('hidden');
    state.currentPage = 'reader';
    renderSurahList();
    renderQuran();
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Font selection
    elements.btnKolkatta?.addEventListener('click', () => {
        state.fontStyle = 'kolkatta';
        save('quran_font_style', 'kolkatta');
        showReaderPage();
    });

    elements.btnHafizi?.addEventListener('click', () => {
        state.fontStyle = 'hafizi';
        save('quran_font_style', 'hafizi');
        showReaderPage();
    });

    // Header controls
    elements.btnMenu?.addEventListener('click', () => {
        window.innerWidth >= 1024 ? toggleSidebar() : openMobileSelector();
    });

    elements.overlay?.addEventListener('click', toggleSidebar);
    elements.btnTheme?.addEventListener('click', toggleTheme);
    elements.btnLang?.addEventListener('click', toggleLanguage);
    elements.btnTrans?.addEventListener('click', toggleTranslation);
    elements.btnBookmarks?.addEventListener('click', openBookmarksModal);
    elements.closeBookmarks?.addEventListener('click', closeBookmarksModal);

    // Font size
    elements.btnFontSize?.addEventListener('click', openFontModal);
    elements.fontClose?.addEventListener('click', closeFontModal);
    elements.fontMinus?.addEventListener('click', () => updateFontSize(state.fontSize - 2));
    elements.fontPlus?.addEventListener('click', () => updateFontSize(state.fontSize + 2));
    elements.fontReset?.addEventListener('click', () => updateFontSize(32));

    // Close modals on outside click
    elements.fontModal?.addEventListener('click', (e) => {
        if (e.target === elements.fontModal) closeFontModal();
    });
    elements.bookmarksModal?.addEventListener('click', (e) => {
        if (e.target === elements.bookmarksModal) closeBookmarksModal();
    });

    // Mobile selector
    elements.closeSelector?.addEventListener('click', closeMobileSelector);

    // Search
    elements.searchSurah?.addEventListener('input', (e) => {
        searchSurah(e.target.value);
    });

    // Initialize toggle states
    elements.btnTrans?.classList.toggle('bg-dark-accent', state.showTranslation);
    elements.btnTrans?.classList.toggle('text-white', state.showTranslation);
    elements.btnTrans?.classList.toggle('text-dark-text', !state.showTranslation);
    elements.btnLang.textContent = state.language === 'bn' ? 'বাং' : 'EN';

    // Responsive handler
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMobileSelector();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (state.currentPage !== 'reader') return;

        if (e.key === 'Escape') {
            closeFontModal();
            closeBookmarksModal();
            closeMobileSelector();
            if (!elements.sidebar.classList.contains('-translate-x-full')) {
                toggleSidebar();
            }
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
async function init() {
    try {
        // Initialize theme and font size
        initTheme();
        initFontSize();

        // Set up event listeners
        setupEventListeners();

        // Set data from the loaded script
        state.quranData = QURAN_DATA;

        // Hide loader
        hideLoader();

        // Check if font is already selected
        const savedFont = localStorage.getItem('quran_font_style');
        if (savedFont) {
            showReaderPage();
        } else {
            showHomePage();
        }
    } catch (error) {
        console.error('Initialization error:', error);
        hideLoader();
        showToast('অ্যাপ লোড করতে সমস্যা');
        showHomePage();
    }
}

// ============================================
// START APPLICATION
// ============================================

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Register Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}