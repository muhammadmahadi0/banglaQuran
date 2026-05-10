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
    TRANSLATION_ID: 201, // Bengali - Dr. Muhammad Farooq
    AUDIO_BASE: 'https://verses.quran.com',
    RECITERS: {
        'ar.alafasy': { name: 'মিশারি আল আফাসি', base: 'ar.alafasy' },
        'ar.husary': { name: 'হোসারি মুখতার', base: 'ar.husary' },
        'ar.abdulbasit': { name: 'আব্দুল বাসিত', base: 'ar.abdulbasit' },
        'ar.shaatree': { name: 'শাত্রী', base: 'ar.shaatree' }
    }
};

// ============================================
// FALLBACK DATA (Complete 114 Surahs)
// ============================================
const FALLBACK_SURAHS = [
    { number: 1, name_simple: 'আল-ফাতিহা', name_arabic: 'ٱلْفَاتِحَة', verses_count: 7, revelation_place: 'Meccan' },
    { number: 2, name_simple: 'আল-বাকারা', name_arabic: 'الْبَقَرَة', verses_count: 286, revelation_place: 'Medinan' },
    { number: 3, name_simple: 'আল-ইমরান', name_arabic: 'آل عِمْرَان', verses_count: 200, revelation_place: 'Medinan' },
    { number: 4, name_simple: 'আন-নিসা', name_arabic: 'النِّسَاء', verses_count: 176, revelation_place: 'Medinan' },
    { number: 5, name_simple: 'আল-মায়িদাহ', name_arabic: 'الْمَائِدَة', verses_count: 120, revelation_place: 'Medinan' },
    { number: 6, name_simple: 'আল-আনআম', name_arabic: 'الْأَنْعَام', verses_count: 165, revelation_place: 'Meccan' },
    { number: 7, name_simple: 'আল-আ\'রাফ', name_arabic: 'الْأَعْرَاف', verses_count: 206, revelation_place: 'Meccan' },
    { number: 8, name_simple: 'আল-আনফাল', name_arabic: 'الْأَنْفَال', verses_count: 75, revelation_place: 'Medinan' },
    { number: 9, name_simple: 'আত-তাওবাহ', name_arabic: 'التَّوْبَة', verses_count: 129, revelation_place: 'Medinan' },
    { number: 10, name_simple: 'ইউনুস', name_arabic: 'يُونُس', verses_count: 109, revelation_place: 'Meccan' },
    { number: 11, name_simple: 'হুদ', name_arabic: 'هُود', verses_count: 123, revelation_place: 'Meccan' },
    { number: 12, name_simple: 'ইউসুফ', name_arabic: 'يُوسُف', verses_count: 111, revelation_place: 'Meccan' },
    { number: 13, name_simple: 'আর-রা\'দ', name_arabic: 'الرَّعْد', verses_count: 43, revelation_place: 'Medinan' },
    { number: 14, name_simple: 'ইব্রাহিম', name_arabic: 'إِبْرَاهِيم', verses_count: 52, revelation_place: 'Meccan' },
    { number: 15, name_simple: 'আল-হিজর', name_arabic: 'الْحِجْر', verses_count: 99, revelation_place: 'Meccan' },
    { number: 16, name_simple: 'আন-নাহল', name_arabic: 'النَّحْل', verses_count: 128, revelation_place: 'Meccan' },
    { number: 17, name_simple: 'আল-ইসরা', name_arabic: 'الْإِسْرَاء', verses_count: 111, revelation_place: 'Meccan' },
    { number: 18, name_simple: 'আল-কাহফ', name_arabic: 'الْكَهْف', verses_count: 110, revelation_place: 'Meccan' },
    { number: 19, name_simple: 'মারয়াম', name_arabic: 'مَرْيَم', verses_count: 98, revelation_place: 'Meccan' },
    { number: 20, name_simple: 'তাহা', name_arabic: 'طه', verses_count: 135, revelation_place: 'Meccan' },
    { number: 21, name_simple: 'আল-আম্বিয়াহ', name_arabic: 'الْأَنْبِيَاء', verses_count: 112, revelation_place: 'Meccan' },
    { number: 22, name_simple: 'আল-হজ', name_arabic: 'الْحَجّ', verses_count: 78, revelation_place: 'Medinan' },
    { number: 23, name_simple: 'আল-মু\'মিনুন', name_arabic: 'الْمُؤْمِنُونَ', verses_count: 118, revelation_place: 'Meccan' },
    { number: 24, name_simple: 'আন-নূর', name_arabic: 'النُّور', verses_count: 64, revelation_place: 'Medinan' },
    { number: 25, name_simple: 'আল-ফুরকান', name_arabic: 'الْفُرْقَان', verses_count: 77, revelation_place: 'Meccan' },
    { number: 26, name_simple: 'আশ-শু\'আরা', name_arabic: 'الشُّعَرَاء', verses_count: 227, revelation_place: 'Meccan' },
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
    { number: 62, name_simple: 'আল-জুমু\'আহ', name_arabic: 'الْجُمُعَة', verses_count: 11, revelation_place: 'Medinan' },
    { number: 63, name_simple: 'আল-মুনাফিকুন', name_arabic: 'الْمُنَافِقُونَ', verses_count: 11, revelation_place: 'Medinan' },
    { number: 64, name_simple: 'আত-তাগাবুন', name_arabic: 'التَّغَابُن', verses_count: 18, revelation_place: 'Medinan' },
    { number: 65, name_simple: 'আত-তালাক', name_arabic: 'الطَّلَاق', verses_count: 12, revelation_place: 'Medinan' },
    { number: 66, name_simple: 'আত-তাহরীম', name_arabic: 'التَّحْرِيم', verses_count: 12, revelation_place: 'Medinan' },
    { number: 67, name_simple: 'আল-মুল্ক', name_arabic: 'الْمُلْك', verses_count: 30, revelation_place: 'Meccan' },
    { number: 68, name_simple: 'আল-কলম', name_arabic: 'الْقَلَم', verses_count: 52, revelation_place: 'Meccan' },
    { number: 69, name_simple: 'আল-হাক্কাহ', name_arabic: 'الْحَاقَّة', verses_count: 52, revelation_place: 'Meccan' },
    { number: 70, name_simple: 'আল-মা\'আরিজ', name_arabic: 'الْمَعَارِج', verses_count: 44, revelation_place: 'Meccan' },
    { number: 71, name_simple: 'নূহ', name_arabic: 'نُوح', verses_count: 28, revelation_place: 'Meccan' },
    { number: 72, name_simple: 'আল-জিন', name_arabic: 'الْجِنّ', verses_count: 28, revelation_place: 'Meccan' },
    { number: 73, name_simple: 'আল-মুয্যযাল', name_arabic: 'الْمُزَّمِّل', verses_count: 20, revelation_place: 'Meccan' },
    { number: 74, name_simple: 'আল-মুদ্দাস্সির', name_arabic: 'الْمُدَّثِّر', verses_count: 56, revelation_place: 'Meccan' },
    { number: 75, name_simple: 'আল-কিয়ামাহ', name_arabic: 'الْقِيَامَة', verses_count: 40, revelation_place: 'Meccan' },
    { number: 76, name_simple: 'আল-ইনসান', name_arabic: 'الْإِنْسَان', verses_count: 31, revelation_place: 'Medinan' },
    { number: 77, name_simple: 'আল-মুর্সালাত', name_arabic: 'الْمُرْسَلَات', verses_count: 50, revelation_place: 'Meccan' },
    { number: 78, name_simple: 'আন-নাবা', name_arabic: 'النَّبَأ', verses_count: 40, revelation_place: 'Meccan' },
    { number: 79, name_simple: 'আন-নাযি\'আত', name_arabic: 'النَّازِعَات', verses_count: 46, revelation_place: 'Meccan' },
    { number: 80, name_simple: 'আবাস', name_arabic: 'عَبَس', verses_count: 42, revelation_place: 'Meccan' },
    { number: 81, name_simple: 'আত-তাকওয়ীর', name_arabic: 'التَّكْوِير', verses_count: 29, revelation_place: 'Meccan' },
    { number: 82, name_simple: 'আল-ইনফিতার', name_arabic: 'الْإِنْفِطَار', verses_count: 19, revelation_place: 'Meccan' },
    { number: 83, name_simple: 'আল-মুতাফফিফীন', name_arabic: 'الْمُطَفِّفِينَ', verses_count: 36, revelation_place: 'Meccan' },
    { number: 84, name_simple: 'আল-ইনশিকাক', name_arabic: 'الْإِنْشِقَاق', verses_count: 25, revelation_place: 'Meccan' },
    { number: 85, name_simple: 'আল-বুরূজ', name_arabic: 'الْبُرُوج', verses_count: 22, revelation_place: 'Meccan' },
    { number: 86, name_simple: 'আত-তারিক', name_arabic: 'الطَّارِق', verses_count: 17, revelation_place: 'Meccan' },
    { number: 87, name_simple: 'আল-আ\'লা', name_arabic: 'الْأَعْلَى', verses_count: 19, revelation_place: 'Meccan' },
    { number: 88, name_simple: 'আল-গাশিয়াহ', name_arabic: 'الْغَاشِيَة', verses_count: 26, revelation_place: 'Meccan' },
    { number: 89, name_simple: 'আল-ফাজর', name_arabic: 'الْفَجْر', verses_count: 30, revelation_place: 'Meccan' },
    { number: 90, name_simple: 'আল-বালাদ', name_arabic: 'الْبَلَد', verses_count: 20, revelation_place: 'Meccan' },
    { number: 91, name_simple: 'আশ-শামস', name_arabic: 'الشَّمْس', verses_count: 15, revelation_place: 'Meccan' },
    { number: 92, name_simple: 'আল-লাইল', name_arabic: 'اللَّيْل', verses_count: 21, revelation_place: 'Meccan' },
    { number: 93, name_simple: 'আদ-দুহা', name_arabic: 'الضُّحَى', verses_count: 11, revelation_place: 'Meccan' },
    { number: 94, name_simple: 'আশ-শারহ', name_arabic: 'الْشَّرْح', verses_count: 8, revelation_place: 'Meccan' },
    { number: 95, name_simple: 'আত-তীন', name_arabic: 'التِّين', verses_count: 8, revelation_place: 'Meccan' },
    { number: 96, name_simple: 'আল-আ\'লাক', name_arabic: 'الْعَلَق', verses_count: 19, revelation_place: 'Meccan' },
    { number: 97, name_simple: 'আল-কদর', name_arabic: 'الْقَدْر', verses_count: 5, revelation_place: 'Meccan' },
    { number: 98, name_simple: 'আল-বাইয়িনাহ', name_arabic: 'الْبَيِّنَة', verses_count: 8, revelation_place: 'Medinan' },
    { number: 99, name_simple: 'আয-যিলজালাহ', name_arabic: 'الزَّلْزَلَة', verses_count: 8, revelation_place: 'Medinan' },
    { number: 100, name_simple: 'আল-আ\'দিয়াত', name_arabic: 'الْعَادِيَات', verses_count: 11, revelation_place: 'Meccan' },
    { number: 101, name_simple: 'আল-কারি\'আহ', name_arabic: 'الْقَارِعَة', verses_count: 11, revelation_place: 'Meccan' },
    { number: 102, name_simple: 'আত-তাকাসুর', name_arabic: 'التَّكَاثُر', verses_count: 8, revelation_place: 'Meccan' },
    { number: 103, name_simple: 'আল-আসর', name_arabic: 'الْعَصْر', verses_count: 3, revelation_place: 'Meccan' },
    { number: 104, name_simple: 'আল-হুমাজাহ', name_arabic: 'الْهُمَزَة', verses_count: 9, revelation_place: 'Meccan' },
    { number: 105, name_simple: 'আল-ফীল', name_arabic: 'الْفِيل', verses_count: 5, revelation_place: 'Meccan' },
    { number: 106, name_simple: 'কুরাইশ', name_arabic: 'قُرَيْش', verses_count: 4, revelation_place: 'Meccan' },
    { number: 107, name_simple: 'আল-মা\'ঊন', name_arabic: 'الْمَاعُون', verses_count: 7, revelation_place: 'Meccan' },
    { number: 108, name_simple: 'আল-কাওছার', name_arabic: 'الْكَوْثَر', verses_count: 3, revelation_place: 'Meccan' },
    { number: 109, name_simple: 'আল-কাফিরুন', name_arabic: 'الْكَافِرُونَ', verses_count: 6, revelation_place: 'Meccan' },
    { number: 110, name_simple: 'আন-নাসর', name_arabic: 'النَّصْر', verses_count: 3, revelation_place: 'Medinan' },
    { number: 111, name_simple: 'আল-মাসাদ', name_arabic: 'الْمَسَد', verses_count: 5, revelation_place: 'Meccan' },
    { number: 112, name_simple: 'আল-ইকলাস', name_arabic: 'الْإِخْلَاص', verses_count: 4, revelation_place: 'Meccan' },
    { number: 113, name_simple: 'আল-ফালাক', name_arabic: 'الْفَلَق', verses_count: 5, revelation_place: 'Meccan' },
    { number: 114, name_simple: 'আন-নাস', name_arabic: 'النَّاس', verses_count: 6, revelation_place: 'Meccan' }
];

// Sample verses fallback (first surah)
const SAMPLE_VERSES = [
    { verse_number: 1, text_uthmani: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', translations: [{ text: 'পরম করুণাময়, অতিদয়াবান আল্লাহর নামে।' }] },
    { verse_number: 2, text_uthmani: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translations: [{ text: 'সমস্ত প্রশংসা আল্লাহর, যিনি সমগ্র বিশ্বের রব।' }] },
    { verse_number: 3, text_uthmani: 'الرَّحْمَنِ الرَّحِيمِ', translations: [{ text: 'পরম করুণাময়, অতিদয়াবান।' }] },
    { verse_number: 4, text_uthmani: 'مَالِكِ يَوْمِ الدِّينِ', translations: [{ text: 'বিচার দিবসের মালিক।' }] },
    { verse_number: 5, text_uthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translations: [{ text: 'আমরা শুধুমাত্র তোমারই ইবাদত করি এবং শুধুমাত্র তোমারই সাহায্য প্রার্থনা করি।' }] },
    { verse_number: 6, text_uthmani: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translations: [{ text: 'আমাদের সরল পথে পরিচালিত করো।' }] },
    { verse_number: 7, text_uthmani: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translations: [{ text: 'যাদের প্রতি তুমি অনুগ্রহ করেছ তাদের পথে, যাদের উপর ক্রোধ হয়েছে এবং যারা পথভ্রষ্ট তাদের পথে নয়।' }] }
];

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
    if (!surahNum) surahNum = 1;
    state.currentSurah = surahNum;

    // Show loading
    elements.quranContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20">
            <div class="loader mb-4"></div>
            <p class="text-dark-muted">সূরা লোড হচ্ছে...</p>
        </div>`;

    try {
        // Fetch Arabic text
        const arabicData = await fetchAPI(`/chapters/${surahNum}/verses?recitation=1`);

        // Fetch Bengali translation
        const transData = await fetchAPI(`/chapters/${surahNum}/verses?translations=${CONFIG.TRANSLATION_ID}&language=bn`);

        if (arabicData && arabicData.verses) {
            state.currentSurahData = arabicData.verses;
            const translationData = transData?.translations || [];
            renderQuran(surahNum, arabicData.verses, translationData);
        } else {
            // Use fallback sample data
            renderQuran(surahNum, SAMPLE_VERSES, SAMPLE_VERSES.map(v => ({ verse_number: v.verse_number, text: v.translations[0].text })));
        }
    } catch (e) {
        // Use fallback on error
        renderQuran(surahNum, SAMPLE_VERSES, SAMPLE_VERSES.map(v => ({ verse_number: v.verse_number, text: v.translations[0].text })));
    }

    updateHeader();
    updateProgress();
    save('quran_current_surah', surahNum);
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

        // Try to fetch surah list from API
        const data = await fetchAPI('/chapters');

        if (data?.chapters && data.chapters.length > 0) {
            state.surahs = data.chapters;
        } else {
            // Use fallback surah data
            state.surahs = FALLBACK_SURAHS;
        }

        hideLoader();

        const savedFont = localStorage.getItem('quran_font_style');
        if (savedFont) {
            // Ensure currentSurah is valid
            const savedSurah = parseInt(localStorage.getItem('quran_current_surah'));
            state.currentSurah = (savedSurah && savedSurah >= 1 && savedSurah <= 114) ? savedSurah : 1;
            showReaderPage();
        } else {
            showHomePage();
        }
    } catch (error) {
        console.error('Init error:', error);
        // Use fallback data
        state.surahs = FALLBACK_SURAHS;
        hideLoader();

        const savedFont = localStorage.getItem('quran_font_style');
        if (savedFont) {
            state.currentSurah = 1;
            showReaderPage();
        } else {
            showHomePage();
        }
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);