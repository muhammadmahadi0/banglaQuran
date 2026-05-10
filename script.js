/**
 * Quran Bangla - Application with alquran.cloud API
 */

// ============================================
// COMPLETE FALLBACK DATA - All 114 Surahs
// ============================================
const SURAHS = [
    { number: 1, name_simple: 'আল-ফাতিহা', name_arabic: 'ٱلْفَاتِحَة', verses_count: 7, revelation_place: 'Meccan' },
    { number: 2, name_simple: 'আল-বাকারা', name_arabic: 'الْبَقَرَة', verses_count: 286, revelation_place: 'Medinan' },
    { number: 3, name_simple: 'আল-ইমরান', name_arabic: 'آل عِمْرَان', verses_count: 200, revelation_place: 'Medinan' },
    { number: 4, name_simple: 'আন-নিসা', name_arabic: 'النِّسَاء', verses_count: 176, revelation_place: 'Medinan' },
    { number: 5, name_simple: 'আল-মায়িদাহ', name_arabic: 'الْمَائِدَة', verses_count: 120, revelation_place: 'Medinan' },
    { number: 6, name_simple: 'আল-আনআম', name_arabic: 'الْأَنْعَام', verses_count: 165, revelation_place: 'Meccan' },
    { number: 7, name_simple: 'আল-আরাফ', name_arabic: 'الْأَعْرَاف', verses_count: 206, revelation_place: 'Meccan' },
    { number: 8, name_simple: 'আল-আনফাল', name_arabic: 'الْأَنْفَال', verses_count: 75, revelation_place: 'Medinan' },
    { number: 9, name_simple: 'আত-তাওবাহ', name_arabic: 'التَّوْبَة', verses_count: 129, revelation_place: 'Medinan' },
    { number: 10, name_simple: 'ইউনুস', name_arabic: 'يُونُس', verses_count: 109, revelation_place: 'Meccan' },
    { number: 11, name_simple: 'হুদ', name_arabic: 'هُود', verses_count: 123, revelation_place: 'Meccan' },
    { number: 12, name_simple: 'ইউসুফ', name_arabic: 'يُوسُف', verses_count: 111, verse_place: 'Meccan' },
    { number: 13, name_simple: 'আর-রাদ', name_arabic: 'الرَّعْد', verses_count: 43, revelation_place: 'Medinan' },
    { number: 14, name_simple: 'ইব্রাহিম', name_arabic: 'إِبْرَاهِيم', verses_count: 52, revelation_place: 'Meccan' },
    { number: 15, name_simple: 'আল-হিজর', name_arabic: 'الْحِجْر', verses_count: 99, revelation_place: 'Meccan' },
    { number: 16, name_simple: 'আন-নাহল', name_arabic: 'النَّحْل', verses_count: 128, revelation_place: 'Meccan' },
    { number: 17, name_simple: 'আল-ইসরা', name_arabic: 'الْإِسْرَاء', verses_count: 111, revelation_place: 'Meccan' },
    { number: 18, name_simple: 'আল-কাহফ', name_arabic: 'الْكَهْف', verses_count: 110, revelation_place: 'Meccan' },
    { number: 19, name_simple: 'মারয়াম', name_arabic: 'مَرْيَم', verses_count: 98, revelation_place: 'Meccan' },
    { number: 20, name_simple: 'তাহা', name_arabic: 'طه', verses_count: 135, revelation_place: 'Meccan' },
    { number: 21, name_simple: 'আল-আম্বিয়াহ', name_arabic: 'الْأَنْبِيَاء', verses_count: 112, revelation_place: 'Meccan' },
    { number: 22, name_simple: 'আল-হজ', name_arabic: 'الْحَجّ', verses_count: 78, revelation_place: 'Medinan' },
    { number: 23, name_simple: 'আল-মুমিনুন', name_arabic: 'الْمُؤْمِنُونَ', verses_count: 118, revelation_place: 'Meccan' },
    { number: 24, name_simple: 'আন-নূর', name_arabic: 'النُّور', verses_count: 64, revelation_place: 'Medinan' },
    { number: 25, name_simple: 'আল-ফুরকান', name_arabic: 'الْفُرْقَان', verses_count: 77, revelation_place: 'Meccan' },
    { number: 26, name_simple: 'আশ-শুআরা', name_arabic: 'الشُّعَرَاء', verses_count: 227, revelation_place: 'Meccan' },
    { number: 27, name_simple: 'আন-নামল', name_arabic: 'النَّمْل', verses_count: 93, revelation_place: 'Meccan' },
    { number: 28, name_simple: 'আল-কাসাস', name_arabic: 'الْقَصَص', verses_count: 88, revelation_place: 'Meccan' },
    { number: 29, name_simple: 'আল-আনকাবুত', name_arabic: 'الْعَنْكَبُوت', verses_count: 69, revelation_place: 'Meccan' },
    { number: 30, name_simple: 'আর-রূম', name_arabic: 'الرُّوم', verses_count: 60, revelation_place: 'Meccan' },
    { number: 31, name_simple: 'লুকমান', name_arabic: 'لُقْمَان', verses_count: 34, revelation_place: 'Meccan' },
    { number: 32, name_simple: 'আস-সাজদাহ', name_arabic: 'السَّجْدَة', verses_count: 30, revelation_place: 'Meccan' },
    { number: 33, name_simple: 'আল-আহযাব', name_arabic: 'الْأَحْزَاب', verses_count: 73, revelation_place: 'Medinan' },
    { number: 34, name_simple: 'সাবা', name_arabic: 'سَبَأ', verses_count: 54, revelation_place: 'Meccan' },
    { number: 35, name_simple: 'ফাতির', name_arabic: 'فَاطِر', verses_count: 45, revelation_place: 'Meccan' },
    { number: 36, name_simple: 'ইয়াসীন', name_arabic: 'يُس', verses_count: 83, revelation_place: 'Meccan' },
    { number: 37, name_simple: 'আস-সাফফাত', name_arabic: 'الصَّافَّات', verses_count: 182, revelation_place: 'Meccan' },
    { number: 38, name_simple: 'সাদ', name_arabic: 'ص', verses_count: 88, revelation_place: 'Meccan' },
    { number: 39, name_simple: 'আয-যুমার', name_arabic: 'الزُّمَر', verses_count: 75, revelation_place: 'Meccan' },
    { number: 40, name_simple: 'গাফির', name_arabic: 'غَافِر', verses_count: 85, revelation_place: 'Meccan' },
    { number: 41, name_simple: 'ফুসসিলাত', name_arabic: 'فُصِّلَتْ', verses_count: 54, revelation_place: 'Meccan' },
    { number: 42, name_simple: 'আশ-শূরা', name_arabic: 'الشُّورَى', verses_count: 53, revelation_place: 'Meccan' },
    { number: 43, name_simple: 'আয-যুখরুফ', name_arabic: 'الزُّخْرُف', verses_count: 89, revelation_place: 'Meccan' },
    { number: 44, name_simple: 'আদ-দুখান', name_arabic: 'الدُّخَان', verses_count: 59, revelation_place: 'Meccan' },
    { number: 45, name_simple: 'আল-জাসিয়াহ', name_arabic: 'الْجَاثِيَة', verses_count: 37, revelation_place: 'Meccan' },
    { number: 46, name_simple: 'আল-আহকাফ', name_arabic: 'الْأَحْقَاف', verses_count: 35, revelation_place: 'Meccan' },
    { number: 47, name_simple: 'মুহাম্মাদ', name_arabic: 'مُحَمَّد', verses_count: 38, revelation_place: 'Medinan' },
    { number: 48, name_simple: 'আল-ফাতহ', name_arabic: 'الْفَتْح', verses_count: 29, revelation_place: 'Medinan' },
    { number: 49, name_simple: 'আল-হুজুরাত', name_arabic: 'الْحُجُرَات', verses_count: 18, revelation_place: 'Medinan' },
    { number: 50, name_simple: 'কাফ', name_arabic: 'ق', verses_count: 45, revelation_place: 'Meccan' },
    { number: 51, name_simple: 'আয-যারিয়াত', name_arabic: 'الذَّارِيَات', verses_count: 60, revelation_place: 'Meccan' },
    { number: 52, name_simple: 'আত-তূর', name_arabic: 'الطُّور', verses_count: 49, revelation_place: 'Meccan' },
    { number: 53, name_simple: 'আন-নজম', name_arabic: 'النَّجْم', verses_count: 62, revelation_place: 'Meccan' },
    { number: 54, name_simple: 'আল-কামার', name_arabic: 'الْقَمَر', verses_count: 55, revelation_place: 'Meccan' },
    { number: 55, name_simple: 'আর-রহমান', name_arabic: 'الرَّحْمَن', verses_count: 78, revelation_place: 'Medinan' },
    { number: 56, name_simple: 'আল-ওয়াকিয়াহ', name_arabic: 'الْوَاقِعَة', verses_count: 96, revelation_place: 'Meccan' },
    { number: 57, name_simple: 'আল-হাদীদ', name_arabic: 'الْحَدِيد', verses_count: 29, revelation_place: 'Medinan' },
    { number: 58, name_simple: 'আল-মুজাদালাহ', name_arabic: 'الْمُجَادِلَة', verses_count: 22, revelation_place: 'Medinan' },
    { number: 59, name_simple: 'আল-হাশর', name_arabic: 'الْحَشْر', verses_count: 24, revelation_place: 'Medinan' },
    { number: 60, name_simple: 'আল-মুমতাহিনাহ', name_arabic: 'الْمُمْتَحَنَة', verses_count: 13, revelation_place: 'Medinan' },
    { number: 61, name_simple: 'আস-সাফ', name_arabic: 'الصُّفّ', verses_count: 14, revelation_place: 'Medinan' },
    { number: 62, name_simple: 'আল-জুমুআহ', name_arabic: 'الْجُمُعَة', verses_count: 11, revelation_place: 'Medinan' },
    { number: 63, name_simple: 'আল-মুনাফিকুন', name_arabic: 'الْمُنَافِقُونَ', verses_count: 11, revelation_place: 'Medinan' },
    { number: 64, name_simple: 'আত-তাগাবুন', name_arabic: 'التَّغَابُن', verses_count: 18, revelation_place: 'Medinan' },
    { number: 65, name_simple: 'আত-তালাক', name_arabic: 'الطَّلَاق', verses_count: 12, revelation_place: 'Medinan' },
    { number: 66, name_simple: 'আত-তাহরীম', name_arabic: 'التَّحْرِيم', verses_count: 12, revelation_place: 'Medinan' },
    { number: 67, name_simple: 'আল-মুল্ক', name_arabic: 'الْمُلْك', verses_count: 30, revelation_place: 'Meccan' },
    { number: 68, name_simple: 'আল-কলম', name_arabic: 'الْقَلَم', verses_count: 52, revelation_place: 'Meccan' },
    { number: 69, name_simple: 'আল-হাক্কাহ', name_arabic: 'الْحَاقَّة', verses_count: 52, revelation_place: 'Meccan' },
    { number: 70, name_simple: 'আল-মাআরিজ', name_arabic: 'الْمَعَارِج', verses_count: 44, revelation_place: 'Meccan' },
    { number: 71, name_simple: 'নূহ', name_arabic: 'نُوح', verses_count: 28, revelation_place: 'Meccan' },
    { number: 72, name_simple: 'আল-জিন', name_arabic: 'الْجِنّ', verses_count: 28, revelation_place: 'Meccan' },
    { number: 73, name_simple: 'আল-মুযযয়াল', name_arabic: 'الْمُزَّمِّل', verses_count: 20, revelation_place: 'Meccan' },
    { number: 74, name_simple: 'আল-মুদ্দাস্সির', name_arabic: 'الْمُدَّثِّر', verses_count: 56, revelation_place: 'Meccan' },
    { number: 75, name_simple: 'আল-কিয়ামাহ', name_arabic: 'الْقِيَامَة', verses_count: 40, revelation_place: 'Meccan' },
    { number: 76, name_simple: 'আল-ইনসান', name_arabic: 'الْإِنْسَان', verses_count: 31, revelation_place: 'Medinan' },
    { number: 77, name_simple: 'আল-মুর্সালাত', name_arabic: 'الْمُرْسَلَات', verses_count: 50, revelation_place: 'Meccan' },
    { number: 78, name_simple: 'আন-নাবা', name_arabic: 'النَّبَأ', verses_count: 40, revelation_place: 'Meccan' },
    { number: 79, name_simple: 'আন-নাযি আত', name_arabic: 'النَّازِعَات', verses_count: 46, revelation_place: 'Meccan' },
    { number: 80, name_simple: 'আবাস', name_arabic: 'عَبَس', verses_count: 42, revelation_place: 'Meccan' },
    { number: 81, name_simple: 'আত-তাকওয়ীর', name_arabic: 'التَّكْوِير', verses_count: 29, revelation_place: 'Meccan' },
    { number: 82, name_simple: 'আল-ইনফিতার', name_arabic: 'الْإِنْفِطَار', verses_count: 19, revelation_place: 'Meccan' },
    { number: 83, name_simple: 'আল-মুতাফফিফীন', name_arabic: 'الْمُطَفِّفِينَ', verses_count: 36, revelation_place: 'Meccan' },
    { number: 84, name_simple: 'আল-ইনশিকাক', name_arabic: 'الْإِنْشِقَاق', verses_count: 25, revelation_place: 'Meccan' },
    { number: 85, name_simple: 'আল-বুরূজ', name_arabic: 'الْبُرُوج', verses_count: 22, revelation_place: 'Meccan' },
    { number: 86, name_simple: 'আত-তারিক', name_arabic: 'الطَّارِق', verses_count: 17, revelation_place: 'Meccan' },
    { number: 87, name_simple: 'আল-আলা', name_arabic: 'الْأَعْلَى', verses_count: 19, revelation_place: 'Meccan' },
    { number: 88, name_simple: 'আল-গাশিয়াহ', name_arabic: 'الْغَاشِيَة', verses_count: 26, revelation_place: 'Meccan' },
    { number: 89, name_simple: 'আল-ফাজর', name_arabic: 'الْفَجْر', verses_count: 30, revelation_place: 'Meccan' },
    { number: 90, name_simple: 'আল-বালাদ', name_arabic: 'الْبَلَد', verses_count: 20, revelation_place: 'Meccan' },
    { number: 91, name_simple: 'আশ-শামস', name_arabic: 'الشَّمْس', verses_count: 15, revelation_place: 'Meccan' },
    { number: 92, name_simple: 'আল-লাইল', name_arabic: 'اللَّيْل', verses_count: 21, revelation_place: 'Meccan' },
    { number: 93, name_simple: 'আয-যহা', name_arabic: 'الضُّحَى', verses_count: 11, revelation_place: 'Meccan' },
    { number: 94, name_simple: 'আশ-শারহ', name_arabic: 'الشَّرْح', verses_count: 8, revelation_place: 'Meccan' },
    { number: 95, name_simple: 'আত-তীন', name_arabic: 'التِّين', verses_count: 8, revelation_place: 'Meccan' },
    { number: 96, name_simple: 'আল-আলাক', name_arabic: 'الْعَلَق', verses_count: 19, revelation_place: 'Meccan' },
    { number: 97, name_simple: 'আল-কদর', name_arabic: 'الْقَدْر', verses_count: 5, revelation_place: 'Meccan' },
    { number: 98, name_simple: 'আল-বাইয়িনাহ', name_arabic: 'الْبَيِّنَة', verses_count: 8, revelation_place: 'Medinan' },
    { number: 99, name_simple: 'আয-যিলজাল', name_arabic: 'الزِّلْزَلَة', verses_count: 8, revelation_place: 'Medinan' },
    { number: 100, name_simple: 'আল-আদিয়াত', name_arabic: 'الْعَادِيَات', verses_count: 11, revelation_place: 'Meccan' },
    { number: 101, name_simple: 'আল-কারিআহ', name_arabic: 'الْقَارِعَة', verses_count: 11, revelation_place: 'Meccan' },
    { number: 102, name_simple: 'আত-তাকাসুর', name_arabic: 'التَّكَاثُر', verses_count: 8, revelation_place: 'Meccan' },
    { number: 103, name_simple: 'আল-আসর', name_arabic: 'الْعَصْر', verses_count: 3, revelation_place: 'Meccan' },
    { number: 104, name_simple: 'আল-হুমাযাহ', name_arabic: 'الْهُمَزَة', verses_count: 9, revelation_place: 'Meccan' },
    { number: 105, name_simple: 'আল-ফীল', name_arabic: 'الْفِيل', verses_count: 5, revelation_place: 'Meccan' },
    { number: 106, name_simple: 'কুরাইশ', name_arabic: 'قُرَيْش', verses_count: 4, revelation_place: 'Meccan' },
    { number: 107, name_simple: 'আল-মাউন', name_arabic: 'الْمَاعُون', verses_count: 7, revelation_place: 'Meccan' },
    { number: 108, name_simple: 'আল-কাউছার', name_arabic: 'الْكَوْثَر', verses_count: 3, revelation_place: 'Meccan' },
    { number: 109, name_simple: 'আল-কাফিরুন', name_arabic: 'الْكَافِرُونَ', verses_count: 6, revelation_place: 'Meccan' },
    { number: 110, name_simple: 'আন-নাসর', name_arabic: 'النَّصْر', verses_count: 3, revelation_place: 'Medinan' },
    { number: 111, name_simple: 'আল-মাসাদ', name_arabic: 'الْمَسَد', verses_count: 5, revelation_place: 'Meccan' },
    { number: 112, name_simple: 'আল-ইখলাস', name_arabic: 'الْإِخْلَاص', verses_count: 4, revelation_place: 'Meccan' },
    { number: 113, name_simple: 'আল-ফালাক', name_arabic: 'الْفَلَق', verses_count: 5, revelation_place: 'Meccan' },
    { number: 114, name_simple: 'আন-নাস', name_arabic: 'النَّاس', verses_count: 6, revelation_place: 'Meccan' }
];

// ============================================
// API CONFIG - alquran.cloud
// ============================================
const API_BASE = 'https://api.alquran.cloud/v1';

async function fetchVerses(surahNum) {
    try {
        const response = await fetch(`${API_BASE}/surah/${surahNum}/ar.alafasy`);
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();

        if (data.data && data.data.verses) {
            return data.data.verses.map(v => ({
                number: v.number,
                arabic: v.text
            }));
        }
    } catch (e) {
        console.error('API Error:', e.message);
    }
    return null;
}

// ============================================
// FALLBACK VERSE DATA - Surah Fatiha
// ============================================
const FATIHA_VERSES = [
    { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', bangla: 'পরম করুণাময়, অতিদয়াবান আল্লাহর নামে।' },
    { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', bangla: 'সমস্ত প্রশংসা আল্লাহর, যিনি সমগ্র বিশ্বের রব।' },
    { number: 3, arabic: 'الرَّحْمَنِ الرَّحِيمِ', bangla: 'পরম করুণাময়, অতিদয়াবান।' },
    { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', bangla: 'বিচার দিবসের মালিক।' },
    { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', bangla: 'আমরা শুধুমাত্র তোমারই ইবাদত করি এবং শুধুমাত্র তোমারই সাহায্য প্রার্থনা করি।' },
    { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', bangla: 'আমাদের সরল পথে পরিচালিত করো।' },
    { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', bangla: 'যাদের প্রতি তুমি অনুগ্রহ করেছ তাদের পথে, যাদের উপর ক্রোধ হয়েছে এবং যারা পথভ্রষ্ট তাদের পথে নয়।' }
];

// ============================================
// STATE
// ============================================
const state = {
    currentPage: 'home',
    fontStyle: localStorage.getItem('quran_font_style') || 'kolkatta',
    theme: localStorage.getItem('quran_theme') || 'dark',
    showTranslation: localStorage.getItem('quran_translation') !== 'false',
    currentSurah: parseInt(localStorage.getItem('quran_current_surah')) || 1,
    bookmarks: JSON.parse(localStorage.getItem('quran_bookmarks') || '[]'),
    arabicFontSize: parseInt(localStorage.getItem('quran_arabic_size')) || 32,
    banglaFontSize: parseInt(localStorage.getItem('quran_bangla_size')) || 18,
    versesCache: {}
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
    toast: $('toast'),
    toastMsg: $('toast-msg')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function toBengali(num) {
    if (num === undefined || num === null) return '০';
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).split('').map(d => bnDigits[parseInt(d)] || d).join('');
}

function toArabic(num) {
    if (num === undefined || num === null) return '٠';
    const arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map(d => arDigits[parseInt(d)] || d).join('');
}

function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { console.warn('Storage error:', e); }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\n/g, ' ');
}

function showToast(msg, duration = 2500) {
    elements.toastMsg.textContent = msg;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), duration);
}

function hideLoader() {
    elements.loader?.classList.add('hidden');
}

// ============================================
// THEME & SETTINGS
// ============================================
function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-mode');
        elements.btnTheme?.querySelector('svg')?.classList.add('hidden');
    }
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    save('quran_theme', state.theme);

    const sunIcon = elements.btnTheme?.querySelector('.sun-icon');
    const moonIcon = elements.btnTheme?.querySelector('.moon-icon');
    if (sunIcon) sunIcon.classList.toggle('hidden', state.theme === 'light');
    if (moonIcon) moonIcon.classList.toggle('hidden', state.theme === 'dark');
}

function initSettings() {
    elements.arabicSize.value = state.arabicFontSize;
    elements.banglaSize.value = state.banglaFontSize;
    document.documentElement.style.setProperty('--arabic-font-size', state.arabicFontSize + 'px');
    document.documentElement.style.setProperty('--bangla-font-size', state.banglaFontSize + 'px');
}

function updateFontSize(type, change) {
    if (type === 'arabic') {
        state.arabicFontSize = Math.max(16, Math.min(48, state.arabicFontSize + change));
        document.documentElement.style.setProperty('--arabic-font-size', state.arabicFontSize + 'px');
        elements.arabicSize.value = state.arabicFontSize;
        save('quran_arabic_size', state.arabicFontSize);
    } else {
        state.banglaFontSize = Math.max(12, Math.min(28, state.banglaFontSize + change));
        document.documentElement.style.setProperty('--bangla-font-size', state.banglaFontSize + 'px');
        elements.banglaSize.value = state.banglaFontSize;
        save('quran_bangla_size', state.banglaFontSize);
    }
}

// ============================================
// TRANSLATION TOGGLE
// ============================================
function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    save('quran_translation', state.showTranslation);
    elements.toggleTranslation.classList.toggle('text-dark-gold', state.showTranslation);
    elements.toggleTranslation.classList.toggle('text-dark-muted', !state.showTranslation);
    renderQuran(state.currentSurah);
}

// ============================================
// SIDEBAR
// ============================================
function toggleSidebar() {
    elements.sidebar.classList.toggle('-translate-x-full');
    elements.sidebarOverlay?.classList.toggle('hidden');
}

function openSettings() { elements.settingsModal.classList.remove('hidden'); elements.settingsModal.classList.add('flex'); }
function closeSettings() { elements.settingsModal.classList.add('hidden'); elements.settingsModal.classList.remove('flex'); }
function openBookmarks() { renderBookmarks(); elements.bookmarksModal.classList.remove('hidden'); elements.bookmarksModal.classList.add('flex'); }
function closeBookmarks() { elements.bookmarksModal.classList.add('hidden'); elements.bookmarksModal.classList.remove('flex'); }
function openSearch() { elements.searchModal.classList.remove('hidden'); elements.globalSearch.focus(); }
function closeSearch() { elements.searchModal.classList.add('hidden'); elements.globalSearch.value = ''; elements.searchResults.innerHTML = ''; }

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
        renderQuran(surah);
    }
}

function removeBookmark(index, e) {
    e.stopPropagation();
    state.bookmarks.splice(index, 1);
    save('quran_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
}

function goToBookmark(surah, ayah) {
    state.currentSurah = surah;
    save('quran_current_surah', surah);
    closeBookmarks();
    renderQuran(surah);
    showToast(`সূরা ${toBengali(surah)} - আয়াত ${toBengali(ayah)}`);
}

function renderBookmarks() {
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = '<div class="text-center text-dark-muted p-6">কোনো বুকমার্ক নেই</div>';
        return;
    }

    const sorted = [...state.bookmarks].sort((a, b) => b.time - a.time);
    elements.bookmarksList.innerHTML = sorted.map((b, i) => {
        const surah = SURAHS.find(s => s.number === b.surah);
        return `<div class="surah-item cursor-pointer" onclick="goToBookmark(${b.surah}, ${b.ayah})">
            <div class="surah-num">${toBengali(b.surah)}</div>
            <div class="flex-1">
                <div class="font-semibold text-dark-text">${surah?.name_simple || ''}</div>
                <div class="text-sm text-dark-muted">আয়াত ${toBengali(b.ayah)}</div>
            </div>
            <button onclick="removeBookmark(${state.bookmarks.indexOf(b)}, event)" class="text-red-500 p-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        </div>`;
    }).join('');
}

// ============================================
// COPY AYAH
// ============================================
function copyAyah(arabic, bangla) {
    const text = `${arabic}\n\n${bangla}`;
    navigator.clipboard.writeText(text).then(() => {
        showToast('আয়াত কপি করা হয়েছে');
    }).catch(() => {
        showToast('কপি ব্যর্থ');
    });
}

// ============================================
// NAVIGATION
// ============================================
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    save('quran_current_surah', surahNum);
    toggleSidebar();
    renderQuran(surahNum);
}

// ============================================
// SEARCH
// ============================================
function searchSurah(query) {
    if (!query.trim()) {
        elements.surahList.innerHTML = '';
        renderSurahList();
        return;
    }

    const filtered = SURAHS.filter(s =>
        s.name_simple.includes(query) ||
        s.name_arabic.includes(query) ||
        s.number.toString() === query
    );

    renderFilteredSurahs(filtered);
}

function globalSearch(query) {
    if (!query.trim()) {
        elements.searchResults.innerHTML = '';
        return;
    }

    const filtered = SURAHS.filter(s =>
        s.name_simple.includes(query) || s.number.toString() === query
    );

    elements.searchResults.innerHTML = filtered.map(s => `
        <div class="surah-item" onclick="goToSurahFromSearch(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1">
                <div class="font-semibold">${s.name_simple}</div>
                <div class="text-sm text-dark-muted">${s.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'} • ${toBengali(s.verses_count)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

function goToSurahFromSearch(surahNum) {
    state.currentSurah = surahNum;
    save('quran_current_surah', surahNum);
    closeSearch();
    renderQuran(surahNum);
}

// ============================================
// SURAH LIST
// ============================================
function renderSurahList() {
    elements.surahList.innerHTML = SURAHS.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1">
                <div class="font-semibold text-dark-text">${s.name_simple}</div>
                <div class="text-sm text-dark-muted">${s.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'} • ${toBengali(s.verses_count)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

function renderFilteredSurahs(list) {
    elements.surahList.innerHTML = list.map(s => `
        <div class="surah-item ${s.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${s.number})">
            <div class="surah-num">${toBengali(s.number)}</div>
            <div class="flex-1">
                <div class="font-semibold text-dark-text">${s.name_simple}</div>
                <div class="text-sm text-dark-muted">${s.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'} • ${toBengali(s.verses_count)} আয়াত</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// HEADER UPDATE
// ============================================
function updateHeader() {
    const surah = SURAHS.find(s => s.number === state.currentSurah);
    elements.surahTitle.textContent = surah?.name_simple || '';
    elements.ayahInfo.textContent = `${toBengali(surah?.verses_count || 0)} আয়াত • ${surah?.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'}`;
}

// ============================================
// PROGRESS
// ============================================
function updateProgress() {
    const totalVerses = SURAHS.reduce((sum, s) => sum + s.verses_count, 0);
    const readVerses = SURAHS.slice(0, state.currentSurah - 1).reduce((sum, s) => sum + s.verses_count, 0);
    const currentSurah = SURAHS.find(s => s.number === state.currentSurah);
    const progress = Math.round(((readVerses + (currentSurah?.verses_count || 0)) / totalVerses) * 100);
    elements.juzProgress.style.width = `${progress}%`;
}

// ============================================
// RENDER QURAN - Using API + Fallback
// ============================================
async function renderQuran(surahNum) {
    const surah = SURAHS.find(s => s.number === surahNum);
    const arabicClass = state.fontStyle === 'kolkatta' ? 'font-amiri' : 'font-schec';

    // Show loading state
    elements.quranContent.innerHTML = '<div class="flex justify-center p-8"><div class="loader"></div></div>';

    let verses = [];

    // Try API first
    if (!state.versesCache[surahNum]) {
        const apiVerses = await fetchVerses(surahNum);
        if (apiVerses) {
            verses = apiVerses.map(v => ({
                number: v.number,
                arabic: v.arabic,
                bangla: surahNum === 1 ? FATIHA_VERSES[v.number - 1]?.bangla : `আয়াত ${toBengali(v.number)}`
            }));
            state.versesCache[surahNum] = verses;
        }
    }

    // Fallback to embedded data
    if (verses.length === 0) {
        if (surahNum === 1) {
            verses = FATIHA_VERSES;
        } else {
            verses = Array.from({ length: surah?.verses_count || 7 }, (_, i) => ({
                number: i + 1,
                arabic: `۝${toArabic(i + 1)}`,
                bangla: `আয়াত ${toBengali(i + 1)} - তথ্য লোড হচ্ছে...`
            }));
        }
    }

    let html = `<div class="surah-header animate-fade-in">
        <div class="surah-name-ar">${surah?.name_arabic}</div>
        <div class="surah-name-bn">${surah?.name_simple}</div>
        <div class="surah-meta">
            <span class="px-3 py-1 bg-dark-card rounded-full text-sm">${surah?.revelation_place === 'Meccan' ? 'মাক্কী' : 'মাদানী'}</span>
            <span class="mx-2">•</span>
            <span>${toBengali(surah?.verses_count || 0)} আয়াত</span>
        </div>
    </div>`;

    if (surahNum !== 9) html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;

    verses.forEach(verse => {
        const bookmarked = isBookmarked(surahNum, verse.number);
        html += `<div class="ayah-card ${state.showTranslation ? '' : 'translation-hidden'}">
            <div class="ayah-actions">
                <button onclick="addBookmark(${surahNum}, ${verse.number})" class="${bookmarked ? 'bookmarked' : ''}" title="বুকমার্ক">
                    <svg class="w-4 h-4" fill="${bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                </button>
                <button onclick="copyAyah('${escapeHtml(verse.arabic)}', '${escapeHtml(verse.bangla)}')" title="কপি">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </button>
            </div>
            <div class="verse-num"><span class="ar-num">${toArabic(verse.number)}</span><span class="bn-num">${toBengali(verse.number)}</span></div>
            <div class="arabic-text ${arabicClass}" style="font-size: var(--arabic-font-size, 32px)">${verse.arabic}</div>
            <div class="bangla-trans" style="font-size: var(--bangla-font-size, 18px)">${verse.bangla}</div>
        </div>`;
    });

    elements.quranContent.innerHTML = html;
    updateHeader();
    updateProgress();
    $('main-content').scrollTop = 0;
}

// ============================================
// PAGE NAVIGATION
// ============================================
function showHomePage() {
    elements.homePage.classList.remove('hidden');
    elements.readerApp.classList.add('hidden');
}

function showReaderPage() {
    elements.homePage.classList.add('hidden');
    elements.readerApp.classList.remove('hidden');
    renderSurahList();
    renderQuran(state.currentSurah);
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    elements.btnKolkatta?.addEventListener('click', () => { state.fontStyle = 'kolkatta'; save('quran_font_style', 'kolkatta'); showReaderPage(); });
    elements.btnHafizi?.addEventListener('click', () => { state.fontStyle = 'hafizi'; save('quran_font_style', 'hafizi'); showReaderPage(); });
    elements.btnMenu?.addEventListener('click', () => window.innerWidth >= 1024 ? toggleSidebar() : toggleSidebar());
    elements.sidebarOverlay?.addEventListener('click', toggleSidebar);
    elements.btnSearch?.addEventListener('click', openSearch);
    elements.btnSettings?.addEventListener('click', openSettings);
    elements.btnTheme?.addEventListener('click', toggleTheme);
    elements.btnBookmarks?.addEventListener('click', openBookmarks);
    elements.closeSettings?.addEventListener('click', closeSettings);
    elements.closeBookmarks?.addEventListener('click', closeBookmarks);
    elements.settingsModal?.addEventListener('click', e => { if (e.target === elements.settingsModal) closeSettings(); });
    elements.bookmarksModal?.addEventListener('click', e => { if (e.target === elements.bookmarksModal) closeBookmarks(); });
    elements.searchModal?.addEventListener('click', e => { if (e.target === elements.searchModal) closeSearch(); });
    elements.searchSurah?.addEventListener('input', e => searchSurah(e.target.value));
    elements.globalSearch?.addEventListener('input', e => globalSearch(e.target.value));
    elements.toggleTranslation?.addEventListener('click', toggleTranslation);
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) { elements.sidebar.classList.remove('-translate-x-full'); elements.sidebarOverlay?.classList.add('hidden'); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSettings(); closeBookmarks(); closeSearch(); } });

    elements.arabicSize?.addEventListener('change', e => {
        state.arabicFontSize = parseInt(e.target.value) || 32;
        document.documentElement.style.setProperty('--arabic-font-size', state.arabicFontSize + 'px');
        save('quran_arabic_size', state.arabicFontSize);
    });

    elements.banglaSize?.addEventListener('change', e => {
        state.banglaFontSize = parseInt(e.target.value) || 18;
        document.documentElement.style.setProperty('--bangla-font-size', state.banglaFontSize + 'px');
        save('quran_bangla_size', state.banglaFontSize);
    });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSettings();
    setupEventListeners();
    hideLoader();

    // Initialize translation toggle state
    if (elements.toggleTranslation) {
        elements.toggleTranslation.classList.toggle('text-dark-gold', state.showTranslation);
        elements.toggleTranslation.classList.toggle('text-dark-muted', !state.showTranslation);
    }
});