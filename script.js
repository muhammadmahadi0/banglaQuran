/**
 * Quran Bangla - Complete Redesigned Application
 * Features: API-based data, audio player, search, settings, bookmarks
 * API: https://api.quran.com/api/v4
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    API_BASE: 'https://api.quran.com/api/v4',
    TRANSLATION_ID: 161, // Bengali (Muhammad Farooq)
    AUDIO_BASE: 'https://verses.quran.com',
    RECITERS: {
        'ar.alafasy': { name: 'মিশারি আল আফাসি', base: 'ar.alafasy' },
        'ar.husary': { name: 'হোসারি মুখতার', base: 'ar.husary' },
        'ar.abdulbasit': { name: 'আব্দুল বাসিত', base: 'ar.abdulbasit' },
        'ar.shaatree': { name: 'শাত্রী', base: 'ar.shaatree' }
    }
};

// ============================================
// STATE
// ============================================
const state = {
    currentPage: 'home',
    fontStyle: localStorage.getItem('quran_font_style') || 'kolkatta',
    theme: localStorage.getItem('quran_theme') || 'dark',
    showTranslation: localStorage.getItem('quran_translation') !== 'false',
    language: localStorage.getItem('quran_language') || 'bn',
    currentSurah: parseInt(localStorage.getItem('quran_current_surah')) || 1,
    currentAyah: parseInt(localStorage.getItem('quran_current_ayah')) || 1,
    bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks') || '[]'),
    arabicFontSize: parseInt(localStorage.getItem('quran_arabic_size')) || 32,
    banglaFontSize: parseInt(localStorage.getItem('quran_bangla_size')) || 18,
    reciter: localStorage.getItem('quran_reciter') || 'ar.alafasy',
    surahs: [],
    currentSurahData: null,
    audio: new Audio(),
    isPlaying: false,
    audioCurrentAyah: 1
};

// ============================================
// DOM ELEMENTS
// ============================================
const $ = id => document.getElementById(id);

const elements = {
    loader: $('loader'),
    homePage: $('home-page'),
    readerApp: $('reader-app'),
    btnKolkatta: $('btn-kolkatta'),
    btnHafizi: $('btn-hafizi'),
    btnMenu: $('btn-menu'),
    btnSearch: $('btn-search'),
    btnSettings: $('btn-settings'),
    btnTheme: $('btn-theme'),
    btnBookmarks: $('btn-bookmarks'),
    sidebar: $('sidebar'),
    sidebarOverlay: $('sidebar-overlay'),
    surahList: $('surah-list'),
    searchSurah: $('search-surah'),
    quranContent: $('quran-content'),
    surahTitle: $('surah-title'),
    ayahInfo: $('ayah-info'),
    juzProgress: $('juz-progress'),
    settingsModal: $('settings-modal'),
    closeSettings: $('close-settings'),
    bookmarksModal: $('bookmarks-modal'),
    closeBookmarks: $('close-bookmarks'),
    bookmarksList: $('bookmarks-list'),
    searchModal: $('search-modal'),
    globalSearch: $('global-search'),
    searchResults: $('search-results'),
    toggleTranslation: $('toggle-translation'),
    reciterSelect: $('reciter-select'),
    arabicSize: $('arabic-size'),
    banglaSize: $('bangla-size'),
    audioPlayer: $('audio-player'),
    audioPlay: $('audio-play'),
    audioPrev: $('audio-prev'),
    audioNext: $('audio-next'),
    audioProgress: $('audio-progress'),
    audioCurrent: $('audio-current'),
    audioDuration: $('audio-duration'),
    audioSurah: $('audio-surah'),
    audioAyah: $('audio-ayah'),
    playIcon: $('play-icon'),
    pauseIcon: $('pause-icon'),
    toast: $('toast'),
    toastMsg: $('toast-msg')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function toBengali(num) {
    if (num === undefined || num === null) return '০';
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bn[parseInt(d)] || d).join('');
}

function toArabic(num) {
    if (num === undefined || num === null) return '٠';
    const ar = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(d => ar[parseInt(d)] || d).join('');
}

function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { console.warn(e); }
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showToast(msg, duration = 2500) {
    elements.toastMsg.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), duration);
}

function hideLoader() {
    if (elements.loader) elements.loader.classList.add('hidden');
}

// ============================================
// API FUNCTIONS
// ============================================
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(`${CONFIG.API_BASE}${endpoint}`);
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showToast('ডাটা লোড করতে সমস্যা');
        return null;
    }
}

// ============================================
// THEME MANAGEMENT
// ============================================
function initTheme() {
    if (state.theme === 'light') document.body.classList.add('light-mode');
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    save('quran_theme', state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = elements.btnTheme?.querySelector('svg');
    if (icon) {
        icon.innerHTML = state.theme === 'light'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
    }
}

// ============================================
// SETTINGS
// ============================================
function initSettings() {
    elements.arabicSize.textContent = toBengali(state.arabicFontSize);
    elements.banglaSize.textContent = toBengali(state.banglaFontSize);
    document.documentElement.style.setProperty('--arabic-font-size', `${state.arabicFontSize}px`);
    document.documentElement.style.setProperty('--bangla-font-size', `${state.banglaFontSize}px`);
    elements.reciterSelect.value = state.reciter;

    // Translation toggle position
    const toggle = elements.toggleTranslation.querySelector('div');
    if (state.showTranslation) {
        toggle.classList.add('translate-x-6');
    } else {
        toggle.classList.remove('translate-x-6');
    }
}

function updateFontSize(type, change) {
    if (type === 'arabic') {
        state.arabicFontSize = Math.max(18, Math.min(48, state.arabicFontSize + change));
        document.documentElement.style.setProperty('--arabic-font-size', `${state.arabicFontSize}px`);
        elements.arabicSize.textContent = toBengali(state.arabicFontSize);
        save('quran_arabic_size', state.arabicFontSize);
    } else {
        state.banglaFontSize = Math.max(12, Math.min(28, state.banglaFontSize + change));
        document.documentElement.style.setProperty('--bangla-font-size', `${state.banglaFontSize}px`);
        elements.banglaSize.textContent = toBengali(state.banglaFontSize);
        save('quran_bangla_size', state.banglaFontSize);
    }
}

function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    save('quran_translation', state.showTranslation);
    const toggle = elements.toggleTranslation.querySelector('div');
    toggle.classList.toggle('translate-x-6', state.showTranslation);
    renderQuran();
}

function changeReciter() {
    state.reciter = elements.reciterSelect.value;
    save('quran_reciter', state.reciter);
    showToast('কারী পরিবর্তন করা হয়েছে');
}

// ============================================
// SIDEBAR & MODALS
// ============================================
function toggleSidebar() {
    elements.sidebar.classList.toggle('-translate-x-full');
    elements.sidebarOverlay.classList.toggle('hidden');
}

function openSettings() {
    elements.settingsModal.classList.remove('hidden');
    elements.settingsModal.classList.add('flex');
}

function closeSettings() {
    elements.settingsModal.classList.add('hidden');
    elements.settingsModal.classList.remove('flex');
}

function openBookmarks() {
    renderBookmarks();
    elements.bookmarksModal.classList.remove('hidden');
    elements.bookmarksModal.classList.add('flex');
}

function closeBookmarks() {
    elements.bookmarksModal.classList.add('hidden');
    elements.bookmarksModal.classList.remove('flex');
}

function openSearch() {
    elements.searchModal.classList.remove('hidden');
    elements.globalSearch.focus();
}

function closeSearch() {
    elements.searchModal.classList.add('hidden');
    elements.globalSearch.value = '';
    elements.searchResults.innerHTML = '';
}

// ============================================
// BOOKMARKS
// ============================================
function isBookmarked(surah, ayah) {
    return state.bookmarks.some(b => b.surah === surah && b.ayah === ayah);
}

function addBookmark(surah, ayah) {
    if (!isBookmarked(surah, ayah)) {
        state.bookmarks.push({ surah, ayah, time: Date.now() });
        save('quran_bookmarks', JSON.stringify(state.bookmarks));
        showToast('বুকমার্ক যোগ করা হয়েছে');
        renderQuran();
    } else {
        showToast('আগে থেকে বুকমার্ক করা আছে');
    }
}

function removeBookmark(index, e) {
    e.stopPropagation();
    state.bookmarks.splice(index, 1);
    save('quran_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
    showToast('বুকমার্ক সরানো হয়েছে');
}

function goToBookmark(surah, ayah) {
    state.currentSurah = surah;
    state.currentAyah = ayah;
    save('quran_current_surah', surah);
    save('quran_current_ayah', ayah);
    closeBookmarks();
    loadSurah(surah);
}

function renderBookmarks() {
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = '<div class="text-center py-10 text-dark-muted">কোনো বুকমার্ক নেই</div>';
        return;
    }
    elements.bookmarksList.innerHTML = state.bookmarks.map((b, i) => {
        const surah = state.surahs.find(s => s.number === b.surah);
        return `
            <div class="flex items-center justify-between p-3 bg-dark-card rounded-lg cursor-pointer hover:bg-dark-highlight/20" onclick="goToBookmark(${b.surah}, ${b.ayah})">
                <div>
                    <div class="font-semibold">${surah?.name_simple || 'সূরা ' + b.surah}</div>
                    <div class="text-sm text-dark-muted">আয়াত ${toBengali(b.ayah)}</div>
                </div>
                <button class="p-2 text-dark-muted hover:text-red-500" onclick="removeBookmark(${i}, event)">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>`;
    }).join('');
}

// ============================================
// COPY
// ============================================
function copyAyah(arabic, bangla) {
    navigator.clipboard?.writeText(`${arabic}\n\n${bangla}`)
        .then(() => showToast('আয়াত কপি হয়েছে'))
        .catch(() => showToast('কপি ব্যর্থ'));
}

// ============================================
// SURAH NAVIGATION
// ============================================
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    save('quran_current_surah', surahNum);
    save('quran_current_ayah', 1);
    loadSurah(surahNum);
    if (window.innerWidth < 1024) toggleSidebar();
}

function searchSurah(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderSurahList();
        return;
    }
    const filtered = state.surahs.filter(s =>
        s.name_simple.toLowerCase().includes(q) ||
        s.name_arabic.includes(query) ||
        s.number.toString() === query
    );
    elements.surahList.innerHTML = filtered.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1 min-w-0">
                <div class="font-semibold truncate">${s.name_simple}</div>
                <div class="text-xs text-dark-muted truncate">${s.name_arabic}</div>
            </div>
            <div class="text-xs text-dark-muted">${toBengali(s.verses_count)}</div>
        </div>
    `).join('');
}

// ============================================
// GLOBAL SEARCH
// ============================================
async function globalSearch(query) {
    const q = query.trim();
    if (!q) {
        elements.searchResults.innerHTML = '';
        return;
    }

    // Search surahs
    const surahResults = state.surahs.filter(s =>
        s.name_simple.toLowerCase().includes(q) ||
        s.name_arabic.includes(q)
    ).slice(0, 5);

    let html = '';

    if (surahResults.length > 0) {
        html += '<div class="mb-4"><h4 class="text-sm font-semibold text-dark-muted mb-2">সূরা</h4>';
        html += surahResults.map(s => `
            <div class="flex items-center gap-3 p-3 bg-dark-card rounded-lg cursor-pointer hover:bg-dark-highlight/20 mb-2" onclick="goToSurahFromSearch(${s.number})">
                <div class="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center text-sm">${toBengali(s.number)}</div>
                <div>
                    <div class="font-semibold">${s.name_simple}</div>
                    <div class="text-xs text-dark-muted">${toBengali(s.verses_count)} আয়াত</div>
                </div>
            </div>
        `).join('');
        html += '</div>';
    }

    html += '<div class="text-center py-4 text-dark-muted text-sm">আরও ফলাফলের জন্য সূরার নাম দিয়ে খুঁজুন</div>';

    elements.searchResults.innerHTML = html;
}

function goToSurahFromSearch(surahNum) {
    closeSearch();
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    save('quran_current_surah', surahNum);
    loadSurah(surahNum);
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderSurahList() {
    elements.surahList.innerHTML = state.surahs.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1 min-w-0">
                <div class="font-semibold truncate">${s.name_simple}</div>
                <div class="text-xs text-dark-muted truncate">${s.name_arabic}</div>
            </div>
            <div class="text-xs text-dark-muted">${toBengali(s.verses_count)}</div>
        </div>
    `).join('');
}

function updateHeader() {
    const surah = state.surahs.find(s => s.number === state.currentSurah);
    if (elements.surahTitle) elements.surahTitle.textContent = surah?.name_simple || '';
    if (elements.ayahInfo) elements.ayahInfo.textContent = `১ / ${toBengali(surah?.verses_count || 0)} আয়াত`;

    // Update audio player info
    if (elements.audioSurah) elements.audioSurah.textContent = surah?.name_simple || '';
}

function updateProgress() {
    const progress = (state.currentSurah / 114) * 100;
    if (elements.juzProgress) elements.juzProgress.style.width = `${progress}%`;
}

// ============================================
// LOAD SURAH DATA
// ============================================
async function loadSurah(surahNum) {
    // Show loading
    elements.quranContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20">
            <div class="loader mb-4"></div>
            <p class="text-dark-muted">সূরা লোড হচ্ছে...</p>
        </div>`;

    // Fetch Arabic text
    const arabicData = await fetchAPI(`/chapters/${surahNum}/verses?recitation=1`);

    // Fetch Bengali translation
    const transData = await fetchAPI(`/chapters/${surahNum}/verses?translations=${CONFIG.TRANSLATION_ID}&language=bn`);

    if (!arabicData) {
        elements.quranContent.innerHTML = '<div class="text-center py-20 text-dark-muted">ত্রুটি হয়েছে</div>';
        return;
    }

    state.currentSurahData = arabicData.verses;
    const translationData = transData?.translations || [];

    renderQuran(surahNum, arabicData.verses, translationData);
    updateHeader();
    updateProgress();

    // Save position
    save('quran_current_surah', surahNum);

    // Scroll to top
    $('main-content').scrollTop = 0;
}

function renderQuran(surahNum, verses, translations) {
    const surah = state.surahs.find(s => s.number === surahNum);
    const arabicClass = state.fontStyle === 'kolkatta' ? 'font-amiri' : 'font-schec';

    let html = `
        <div class="surah-header animate-fade-in">
            <div class="surah-name-ar">${surah?.name_arabic}</div>
            <div class="surah-name-bn">${surah?.name_simple}</div>
            <div class="surah-meta">
                <span class="px-3 py-1 bg-dark-card rounded-full text-sm">${surah?.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'}</span>
                <span class="mx-2">•</span>
                <span>${toBengali(surah?.verses_count || 0)} আয়াত</span>
            </div>
        </div>
    `;

    // Bismillah (except Surah 9)
    if (surahNum !== 9) {
        html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    }

    // Render verses
    verses.forEach((verse, index) => {
        const trans = translations.find(t => t.verse_number === verse.verse_number);
        const bangla = trans?.text || '';
        const bookmarked = isBookmarked(surahNum, verse.verse_number);

        html += `
            <div class="ayah-card ${state.showTranslation ? '' : 'translation-hidden'}" id="ayah-${surahNum}-${verse.verse_number}">
                <div class="ayah-actions">
                    <button onclick="addBookmark(${surahNum}, ${verse.verse_number})" class="${bookmarked ? 'bookmarked' : ''}" title="বুকমার্ক">
                        <svg class="w-4 h-4" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                        </svg>
                    </button>
                    <button onclick="playAyah(${surahNum}, ${verse.verse_number})" title="প্লে">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <button onclick="copyAyah('${escapeHtml(verse.text_uthmani)}', '${escapeHtml(bangla)}')" title="কপি">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                    </button>
                </div>

                <div class="verse-num">
                    <span class="ar-num">${toArabic(verse.verse_number)}</span>
                    <span class="bn-num">${toBengali(verse.verse_number)}</span>
                </div>

                <div class="arabic-text ${arabicClass}" style="font-size: var(--arabic-font-size, 32px)">${verse.text_uthmani}</div>

                <div class="bangla-trans" style="font-size: var(--bangla-font-size, 18px)">${bangla}</div>
            </div>
        `;
    });

    elements.quranContent.innerHTML = html;
}

// ============================================
// AUDIO PLAYER
// ============================================
function playAyah(surahNum, ayahNum) {
    const reciter = CONFIG.RECITERS[state.reciter];
    const base = reciter.base;

    // Format: 001001.mp3 (surah 1, ayah 1)
    const audioUrl = `${CONFIG.AUDIO_BASE}/${base}/${surahNum.toString().padStart(3, '0')}${ayahNum.toString().padStart(3, '0')}.mp3`;

    state.audio.src = audioUrl;
    state.audioCurrentAyah = ayahNum;
    state.currentSurah = surahNum;

    state.audio.play().then(() => {
        state.isPlaying = true;
        updateAudioUI();
        elements.audioPlayer.classList.remove('hidden');

        elements.audioSurah.textContent = state.surahs.find(s => s.number === surahNum)?.name_simple || '';
        elements.audioAyah.textContent = `আয়াত ${toBengali(ayahNum)}`;
    }).catch(err => {
        console.error('Audio error:', err);
        showToast('অডিও চালাতে সমস্যা');
    });
}

function toggleAudioPlay() {
    if (state.isPlaying) {
        state.audio.pause();
    } else {
        state.audio.play();
    }
    state.isPlaying = !state.isPlaying;
    updateAudioUI();
}

function updateAudioUI() {
    elements.playIcon.classList.toggle('hidden', state.isPlaying);
    elements.pauseIcon.classList.toggle('hidden', !state.isPlaying);
}

function prevAyah() {
    if (state.audioCurrentAyah > 1) {
        playAyah(state.currentSurah, state.audioCurrentAyah - 1);
    }
}

function nextAyah() {
    const surah = state.surahs.find(s => s.number === state.currentSurah);
    if (state.audioCurrentAyah < (surah?.verses_count || 0)) {
        playAyah(state.currentSurah, state.audioCurrentAyah + 1);
    }
}

// Audio progress
state.audio.addEventListener('timeupdate', () => {
    const progress = (state.audio.currentTime / state.audio.duration) * 100 || 0;
    elements.audioProgress.style.width = `${progress}%`;

    const current = formatTime(state.audio.currentTime);
    elements.audioCurrent.textContent = current;
});

state.audio.addEventListener('loadedmetadata', () => {
    elements.audioDuration.textContent = formatTime(state.audio.duration);
});

state.audio.addEventListener('ended', () => {
    nextAyah();
});

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// ============================================
// PAGE NAVIGATION
// ============================================
function showHomePage() {
    elements.homePage.classList.remove('hidden');
    elements.readerApp.classList.add('hidden');
    state.currentPage = 'home';
}

function showReaderPage() {
    elements.homePage.classList.add('hidden');
    elements.readerApp.classList.remove('hidden');
    state.currentPage = 'reader';
    renderSurahList();
    loadSurah(state.currentSurah);
}

// ============================================
// EVENT LISTENERS
// ============================================
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
    elements.btnMenu?.addEventListener('click', toggleSidebar);
    elements.sidebarOverlay?.addEventListener('click', toggleSidebar);
    elements.btnSearch?.addEventListener('click', openSearch);
    elements.btnSettings?.addEventListener('click', openSettings);
    elements.btnTheme?.addEventListener('click', toggleTheme);
    elements.btnBookmarks?.addEventListener('click', openBookmarks);

    // Modals
    elements.closeSettings?.addEventListener('click', closeSettings);
    elements.closeBookmarks?.addEventListener('click', closeBookmarks);
    elements.settingsModal?.addEventListener('click', e => { if (e.target === elements.settingsModal) closeSettings(); });
    elements.bookmarksModal?.addEventListener('click', e => { if (e.target === elements.bookmarksModal) closeBookmarks(); });
    elements.searchModal?.addEventListener('click', e => { if (e.target === elements.searchModal) closeSearch(); });

    // Search
    elements.searchSurah?.addEventListener('input', e => searchSurah(e.target.value));
    elements.globalSearch?.addEventListener('input', e => globalSearch(e.target.value));

    // Settings
    elements.toggleTranslation?.addEventListener('click', toggleTranslation);
    elements.reciterSelect?.addEventListener('change', changeReciter);

    // Audio
    elements.audioPlay?.addEventListener('click', toggleAudioPlay);
    elements.audioPrev?.addEventListener('click', prevAyah);
    elements.audioNext?.addEventListener('click', nextAyah);

    // Responsive
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            elements.sidebar.classList.remove('-translate-x-full');
            elements.sidebarOverlay?.classList.add('hidden');
        }
    });

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeSettings();
            closeBookmarks();
            closeSearch();
            if (!elements.sidebar.classList.contains('-translate-x-full')) toggleSidebar();
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    try {
        initTheme();
        initSettings();
        setupEventListeners();

        // Fetch surah list
        const data = await fetchAPI('/chapters');
        if (data?.chapters) {
            state.surahs = data.chapters;
            hideLoader();

            const savedFont = localStorage.getItem('quran_font_style');
            if (savedFont) {
                showReaderPage();
            } else {
                showHomePage();
            }
        } else {
            throw new Error('Failed to load surahs');
        }
    } catch (error) {
        console.error('Init error:', error);
        hideLoader();
        showToast('অ্যাপ লোড করতে সমস্যা');
        showHomePage();
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);