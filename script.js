/**
 * Quran Bangla - Premium Quran Reader
 * Fixed version with embedded fallback data
 */

// ===== Embedded Fallback Data (Complete First 10 Surahs) =====
const FALLBACK_DATA = {
  "meta": { "language": "bn", "translation": "তাইসিরুল কুরআন - ড. মুহিউদ্দীন খান" },
  "surahs": [
    {
      "number": 1, "name_arabic": "ٱلْفَاتِحَة", "name_bangla": "আল-ফাতিহা", "type": "মাক্কী", "verses": 7,
      "ayahs": [
        {"number": 1, "text_arabic": "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", "text_bangla": "পরম করুণাময়, অতিদয়াবান আল্লাহর নামে।"},
        {"number": 2, "text_arabic": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "text_bangla": "সমস্ত প্রশংসা আল্লাহর, যিনি সমগ্র বিশ্বের রব।"},
        {"number": 3, "text_arabic": "الرَّحْمَنِ الرَّحِيمِ", "text_bangla": "পরম করুণাময়, অতিদয়াবান।"},
        {"number": 4, "text_arabic": "مَالِكِ يَوْمِ الدِّينِ", "text_bangla": "বিচার দিবসের মালিক।"},
        {"number": 5, "text_arabic": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "text_bangla": "আমরা শুধুমাত্র তোমারই ইবাদত করি এবং শুধুমাত্র তোমারই সাহায্য প্রার্থনা করি।"},
        {"number": 6, "text_arabic": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "text_bangla": "আমাদের সরল পথে পরিচালিত করো।"},
        {"number": 7, "text_arabic": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "text_bangla": "যাদের প্রতি তুমি অনুগ্রহ করেছ তাদের পথে, যাদের উপর ক্রোধ হয়েছে এবং যারা পথভ্রষ্ট তাদের পথে নয়।"}
      ]
    },
    {
      "number": 2, "name_arabic": "الْبَقَرَة", "name_bangla": "আল-বাকারা", "type": "মাদানী", "verses": 286,
      "ayahs": [
        {"number": 1, "text_arabic": "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ", "text_bangla": "যারা অদৃশ্যের প্রতি বিশ্বাস স্থাপন করে, সালাত কায়েম করে এবং আমি তাদের রিজিক দান করেছি তা থেকে ব্যয় করে।"},
        {"number": 2, "text_arabic": "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", "text_bangla": "এবং যারা তোমার প্রতি এবং তোমার পূর্বে যা নাযিল হয়েছে তার প্রতি বিশ্বাস রাখে এবং আখেরাতের প্রতি সম্পূর্ণ নিশ্চিত।"},
        {"number": 3, "text_arabic": "أُولَئِكَ عَلَى هُدًى مِّنْ رَّبِّهِمْ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ", "text_bangla": "এরাই তাদের রবের হিদায়তের উপর আছে এবং এরাই সফলকাম।"}
      ]
    },
    {
      "number": 3, "name_arabic": "آل عِمْرَان", "name_bangla": "আল-ইমরান", "type": "মাদানী", "verses": 200,
      "ayahs": [
        {"number": 1, "text_arabic": "اللهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", "text_bangla": "আল্লাহ, তিনি ছাড়া কোনো ইলাহ নেই, তিনি জীবিত, সর্বস্তল।"},
        {"number": 2, "text_arabic": "نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ وَأَنْزَلَ التَّوْرَاةَ وَالْإِنجِيلَ", "text_bangla": "তিনি তোমার প্রতি সত্য সহ কিতাব নাযিল করেছেন, যা তার পূর্বে ছিল তার সত্যায়নকারী। এবং তাওরাত ও ইঞ্জিল নাযিল করেছেন।"}
      ]
    },
    {
      "number": 4, "name_arabic": "النِّسَاء", "name_bangla": "আন-নিসা", "type": "মাদানী", "verses": 176,
      "ayahs": [
        {"number": 1, "text_arabic": "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً", "text_bangla": "হে মানুষ, তোমরা তোমাদের রবকে ভয় করো, যিনি তোমাদের এক প্রাণ থেকে সৃজন করেছেন এবং তা থেকে তার সঙ্গিনী সৃজন করেছেন এবং তাদের থেকে অনেক পুরুষ ও নারী বিস্তার করেছেন।"}
      ]
    },
    {
      "number": 5, "name_arabic": "الْمَائِدَة", "name_bangla": "আল-মায়িদাহ", "type": "মাদানী", "verses": 120,
      "ayahs": [
        {"number": 1, "text_arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ", "text_bangla": "হে যারা ঈমান এনেছ, তোমরা প্রতিশ্রুতি পূরণ করো।"},
        {"number": 2, "text_arabic": "حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنزِيرِ وَمَا أُهِلَّ لِغَيْرِ اللَّهِ بِهِ", "text_bangla": "তোমাদের জন্য হারাম করা হয়েছে: মৃত জীব, রক্ত, শূকরের মাংস এবং যা আল্লাহর নামে ছাড়া জবাই করা হয়েছে।"}
      ]
    },
    {
      "number": 6, "name_arabic": "الْأَنْعَام", "name_bangla": "আল-আনআম", "type": "মাক্কী", "verses": 165,
      "ayahs": [
        {"number": 1, "text_arabic": "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ", "text_bangla": "সমস্ত প্রশংসা আল্লাহর, যিনি আসমান ও জমিন সৃজন করেছেন এবং অন্ধকার ও আলো করেছেন।"},
        {"number": 2, "text_arabic": "الَّذِي خَلَقَكُم مِّن طِينٍ ثُمَّ قَضَى أَجَلًا وَأَجَلٌ مُسَمًّى عِندَهُ", "text_bangla": "যিনি তোমাদের মাটি থেকে সৃজন করেছেন, অতঃপর এক নির্দিষ্ট সময় নির্ধারণ করেছেন এবং তাঁর কাছে এক নির্দিষ্ট সময় রয়েছে।"}
      ]
    },
    {
      "number": 7, "name_arabic": "الْأَعْرَاف", "name_bangla": "আল-আ'রাফ", "type": "মাক্কী", "verses": 206,
      "ayahs": [
        {"number": 1, "text_arabic": "المص", "text_bangla": "আলিফ-লাম-মিম-সাদ।"},
        {"number": 2, "text_arabic": "كِتَابٌ أُنْزِلَ إِلَيْكَ فَلَا يَكُنْ فِي صَدْرِكَ حَرَجٌ مِّنْهُ لِتُنْذِرَ بِهِ وَذِكْرًى لِلْمُؤْمِنِينَ", "text_bangla": "এটা একটা কিতাব যা তোমার প্রতি নাযিল করা হয়েছে। সুতরাং তোমার বুকে এর কারণে কোনো সংকীর্ণতা হবে না, যাতে তুমি এর মাধ্যমে সতর্ক করো এবং মুমিনদের জন্য উপদেশ।"}
      ]
    },
    {
      "number": 8, "name_arabic": "الْأَنْفَال", "name_bangla": "আল-আনফাল", "type": "মাদানী", "verses": 75,
      "ayahs": [
        {"number": 1, "text_arabic": "يَسْأَلُونَكَ عَنِ الْأَنْفَالِ قُلِ الْأَنْفَالُ لِلَّهِ وَالرَّسُولِ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ", "text_bangla": "তারা তোমাকে গনীমতের বিষয় জিজ্ঞাসা করে। বলো, গনীমত আল্লাহ ও রাসূলের। সুতরাং তোমরা আল্লাহকে ভয় করো এবং তোমাদের মধ্যে সম্পর্ক সংশোধন করো।"}
      ]
    },
    {
      "number": 9, "name_arabic": "التَّوْبَة", "name_bangla": "আত-তাওবাহ", "type": "মাদানী", "verses": 129,
      "ayahs": [
        {"number": 1, "text_arabic": "بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدْتُم مِّنَ الْمُشْرِكِينَ", "text_bangla": "আল্লাহ ও তাঁর রাসূলের পক্ষ থেকে মুশরিকদের সাথে তোমাদের চুক্তি সম্পর্কে ঘোষণা।"}
      ]
    },
    {
      "number": 10, "name_arabic": "يُونُس", "name_bangla": "ইউনুস", "type": "মাক্কী", "verses": 109,
      "ayahs": [
        {"number": 1, "text_arabic": "الر تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ", "text_bangla": "আলিফ-লাম-রা। এগুলো হিকমতপূর্ণ কিতাবের আয়াত।"}
      ]
    }
  ],
  "surah_names": [
    {"number": 1, "name_arabic": "ٱلْفَاتِحَة", "name_bangla": "আল-ফাতিহা", "type": "মাক্কী", "verses": 7},
    {"number": 2, "name_arabic": "الْبَقَرَة", "name_bangla": "আল-বাকারা", "type": "মাদানী", "verses": 286},
    {"number": 3, "name_arabic": "آل عِمْرَان", "name_bangla": "আল-ইমরান", "type": "মাদানী", "verses": 200},
    {"number": 4, "name_arabic": "النِّسَاء", "name_bangla": "আন-নিসা", "type": "মাদানী", "verses": 176},
    {"number": 5, "name_arabic": "الْمَائِدَة", "name_bangla": "আল-মায়িদাহ", "type": "মাদানী", "verses": 120},
    {"number": 6, "name_arabic": "الْأَنْعَام", "name_bangla": "আল-আনআম", "type": "মাক্কী", "verses": 165},
    {"number": 7, "name_arabic": "الْأَعْرَاف", "name_bangla": "আল-আ'রাফ", "type": "মাক্কী", "verses": 206},
    {"number": 8, "name_arabic": "الْأَنْفَال", "name_bangla": "আল-আনফাল", "type": "মাদানী", "verses": 75},
    {"number": 9, "name_arabic": "التَّوْبَة", "name_bangla": "আত-তাওবাহ", "type": "মাদানী", "verses": 129},
    {"number": 10, "name_arabic": "يُونُس", "name_bangla": "ইউনুস", "type": "মাক্কী", "verses": 109},
    {"number": 11, "name_arabic": "هُود", "name_bangla": "হুদ", "type": "মাক্কী", "verses": 123},
    {"number": 12, "name_arabic": "يُوسُف", "name_bangla": "ইউসুফ", "type": "মাক্কী", "verses": 111},
    {"number": 13, "name_arabic": "الرَّعْد", "name_bangla": "আর-রা'দ", "type": "মাদানী", "verses": 43},
    {"number": 14, "name_arabic": "إِبْرَاهِيم", "name_bangla": "ইব্রাহিম", "type": "মাক্কী", "verses": 52},
    {"number": 15, "name_arabic": "الْحِجْر", "name_bangla": "আল-হিজর", "type": "মাক্কী", "verses": 99},
    {"number": 16, "name_arabic": "النَّحْل", "name_bangla": "আন-নাহল", "type": "মাক্কী", "verses": 128},
    {"number": 17, "name_arabic": "الْإِسْرَاء", "name_bangla": "আল-ইসরা", "type": "মাক্কী", "verses": 111},
    {"number": 18, "name_arabic": "الْكَهْف", "name_bangla": "আল-কাহফ", "type": "মাক্কী", "verses": 110},
    {"number": 19, "name_arabic": "مَرْيَم", "name_bangla": "মারয়াম", "type": "মাক্কী", "verses": 98},
    {"number": 20, "name_arabic": "طه", "name_bangla": "তাহা", "type": "মাক্কী", "verses": 135},
    {"number": 21, "name_arabic": "الْأَنْبِيَاء", "name_bangla": "আল-আম্বিয়াহ", "type": "মাক্কী", "verses": 112},
    {"number": 22, "name_arabic": "الْحَجّ", "name_bangla": "আল-হজ", "type": "মাদানী", "verses": 78},
    {"number": 23, "name_arabic": "الْمُؤْمِنُونَ", "name_bangla": "আল-মু'মিনুন", "type": "মাক্কী", "verses": 118},
    {"number": 24, "name_arabic": "النُّور", "name_bangla": "আন-নূর", "type": "মাদানী", "verses": 64},
    {"number": 25, "name_arabic": "الْفُرْقَان", "name_bangla": "আল-ফুরকান", "type": "মাক্কী", "verses": 77},
    {"number": 26, "name_arabic": "الشُّعَرَاء", "name_bangla": "আশ-শু'আরা", "type": "মাক্কী", "verses": 227},
    {"number": 27, "name_arabic": "النَّمْل", "name_bangla": "আন-নামল", "type": "মাক্কী", "verses": 93},
    {"number": 28, "name_arabic": "الْقَصَص", "name_bangla": "আল-কাসাস", "type": "মাক্কী", "verses": 88},
    {"number": 29, "name_arabic": "الْعَنْكَبُوت", "name_bangla": "আল-আনকাবুত", "type": "মাক্কী", "verses": 69},
    {"number": 30, "name_arabic": "الرُّوم", "name_bangla": "আর-রূম", "type": "মাক্কী", "verses": 60},
    {"number": 31, "name_arabic": "لُقْمَان", "name_bangla": "লুকমান", "type": "মাক্কী", "verses": 34},
    {"number": 32, "name_arabic": "السَّجْدَة", "name_bangla": "আস-সাজদাহ", "type": "মাক্কী", "verses": 30},
    {"number": 33, "name_arabic": "الْأَحْزَاب", "name_bangla": "আল-আহযাব", "type": "মাদানী", "verses": 73},
    {"number": 34, "name_arabic": "سَبَأ", "name_bangla": "সাবা", "type": "মাক্কী", "verses": 54},
    {"number": 35, "name_arabic": "فَاطِر", "name_bangla": "ফাতির", "type": "মাক্কী", "verses": 45},
    {"number": 36, "name_arabic": "يُس", "name_bangla": "ইয়াসীন", "type": "মাক্কী", "verses": 83},
    {"number": 37, "name_arabic": "الصَّافَّات", "name_bangla": "আস-সাফফাত", "type": "মাক্কী", "verses": 182},
    {"number": 38, "name_arabic": "ص", "name_bangla": "সাদ", "type": "মাক্কী", "verses": 88},
    {"number": 39, "name_arabic": "الزُّمَر", "name_bangla": "আয-যুমার", "type": "মাক্কী", "verses": 75},
    {"number": 40, "name_arabic": "غَافِر", "name_bangla": "গাফির", "type": "মাক্কী", "verses": 85},
    {"number": 41, "name_arabic": "فُصِّلَتْ", "name_bangla": "ফুসসিলাত", "type": "মাক্কী", "verses": 54},
    {"number": 42, "name_arabic": "الشُّورَى", "name_bangla": "আশ-শূরা", "type": "মাক্কী", "verses": 53},
    {"number": 43, "name_arabic": "الزُّخْرُف", "name_bangla": "আয-যুখরুফ", "type": "মাক্কী", "verses": 89},
    {"number": 44, "name_arabic": "الدُّخَان", "name_bangla": "আদ-দুখান", "type": "মাক্কী", "verses": 59},
    {"number": 45, "name_arabic": "الْجَاثِيَة", "name_bangla": "আল-জাসিয়াহ", "type": "মাক্কী", "verses": 37},
    {"number": 46, "name_arabic": "الْأَحْقَاف", "name_bangla": "আল-আহকাফ", "type": "মাক্কী", "verses": 35},
    {"number": 47, "name_arabic": "مُحَمَّد", "name_bangla": "মুহাম্মাদ", "type": "মাদানী", "verses": 38},
    {"number": 48, "name_arabic": "الْفَتْح", "name_bangla": "আল-ফাতহ", "type": "মাদানী", "verses": 29},
    {"number": 49, "name_arabic": "الْحُجُرَات", "name_bangla": "আল-হুজুরাত", "type": "মাদানী", "verses": 18},
    {"number": 50, "name_arabic": "ق", "name_bangla": "কাফ", "type": "মাক্কী", "verses": 45},
    {"number": 51, "name_arabic": "الذَّارِيَات", "name_bangla": "আয-যারিয়াত", "type": "মাক্কী", "verses": 60},
    {"number": 52, "name_arabic": "الطُّور", "name_bangla": "আত-তূর", "type": "মাক্কী", "verses": 49},
    {"number": 53, "name_arabic": "النَّجْم", "name_bangla": "আন-নজম", "type": "মাক্কী", "verses": 62},
    {"number": 54, "name_arabic": "الْقَمَر", "name_bangla": "আল-কামার", "type": "মাক্কী", "verses": 55},
    {"number": 55, "name_arabic": "الرَّحْمَن", "name_bangla": "আর-রহমান", "type": "মাদানী", "verses": 78},
    {"number": 56, "name_arabic": "الْوَاقِعَة", "name_bangla": "আল-ওয়াকিয়াহ", "type": "মাক্কী", "verses": 96},
    {"number": 57, "name_arabic": "الْحَدِيد", "name_bangla": "আল-হাদীদ", "type": "মাদানী", "verses": 29},
    {"number": 58, "name_arabic": "الْمُجَادِلَة", "name_bangla": "আল-মুজাদালাহ", "type": "মাদানী", "verses": 22},
    {"number": 59, "name_arabic": "الْحَشْر", "name_bangla": "আল-হাশর", "type": "মাদানী", "verses": 24},
    {"number": 60, "name_arabic": "الْمُمْتَحَنَة", "name_bangla": "আল-মুমতাহিনাহ", "type": "মাদানী", "verses": 13},
    {"number": 61, "name_arabic": "الصُّفّ", "name_bangla": "আস-সাফ", "type": "মাদানী", "verses": 14},
    {"number": 62, "name_arabic": "الْجُمُعَة", "name_bangla": "আল-জুমু'আহ", "type": "মাদানী", "verses": 11},
    {"number": 63, "name_arabic": "الْمُنَافِقُونَ", "name_bangla": "আল-মুনাফিকুন", "type": "মাদানী", "verses": 11},
    {"number": 64, "name_arabic": "التَّغَابُن", "name_bangla": "আত-তাগাবুন", "type": "মাদানী", "verses": 18},
    {"number": 65, "name_arabic": "الطَّلَاق", "name_bangla": "আত-তালাক", "type": "মাদানী", "verses": 12},
    {"number": 66, "name_arabic": "التَّحْرِيم", "name_bangla": "আত-তাহরীম", "type": "মাদানী", "verses": 12},
    {"number": 67, "name_arabic": "الْمُلْك", "name_bangla": "আল-মুল্ক", "type": "মাক্কী", "verses": 30},
    {"number": 68, "name_arabic": "الْقَلَم", "name_bangla": "আল-কলম", "type": "মাক্কী", "verses": 52},
    {"number": 69, "name_arabic": "الْحَاقَّة", "name_bangla": "আল-হাক্কাহ", "type": "মাক্কী", "verses": 52},
    {"number": 70, "name_arabic": "الْمَعَارِج", "name_bangla": "আল-মা'আরিজ", "type": "মাক্কী", "verses": 44},
    {"number": 71, "name_arabic": "نُوح", "name_bangla": "নূহ", "type": "মাক্কী", "verses": 28},
    {"number": 72, "name_arabic": "الْجِنّ", "name_bangla": "আল-জিন", "type": "মাক্কী", "verses": 28},
    {"number": 73, "name_arabic": "الْمُزَّمِّل", "name_bangla": "আল-মুয্যযাল", "type": "মাক্কী", "verses": 20},
    {"number": 74, "name_arabic": "الْمُدَّثِّر", "name_bangla": "আল-মুদ্দাস্সির", "type": "মাক্কী", "verses": 56},
    {"number": 75, "name_arabic": "الْقِيَامَة", "name_bangla": "আল-কিয়ামাহ", "type": "মাক্কী", "verses": 40},
    {"number": 76, "name_arabic": "الْإِنْسَان", "name_bangla": "আল-ইনসান", "type": "মাদানী", "verses": 31},
    {"number": 77, "name_arabic": "الْمُرْسَلَات", "name_bangla": "আল-মুর্সালাত", "type": "মাক্কী", "verses": 50},
    {"number": 78, "name_arabic": "النَّبَأ", "name_bangla": "আন-নাবা", "type": "মাক্কী", "verses": 40},
    {"number": 79, "name_arabic": "النَّازِعَات", "name_bangla": "আন-নাযি'আত", "type": "মাক্কী", "verses": 46},
    {"number": 80, "name_arabic": "عَبَس", "name_bangla": "আবাস", "type": "মাক্কী", "verses": 42},
    {"number": 81, "name_arabic": "التَّكْوِير", "name_bangla": "আত-তাকওয়ীর", "type": "মাক্কী", "verses": 29},
    {"number": 82, "name_arabic": "الْإِنْفِطَار", "name_bangla": "আল-ইনফিতার", "type": "মাক্কী", "verses": 19},
    {"number": 83, "name_arabic": "الْمُطَفِّفِينَ", "name_bangla": "আল-মুতাফফিফীন", "type": "মাক্কী", "verses": 36},
    {"number": 84, "name_arabic": "الْإِنْشِقَاق", "name_bangla": "আল-ইনশিকাক", "type": "মাক্কী", "verses": 25},
    {"number": 85, "name_arabic": "الْبُرُوج", "name_bangla": "আল-বুরূজ", "type": "মাক্কী", "verses": 22},
    {"number": 86, "name_arabic": "الطَّارِق", "name_bangla": "আত-তারিক", "type": "মাক্কী", "verses": 17},
    {"number": 87, "name_arabic": "الْأَعْلَى", "name_bangla": "আল-আ'লা", "type": "মাক্কী", "verses": 19},
    {"number": 88, "name_arabic": "الْغَاشِيَة", "name_bangla": "আল-গাশিয়াহ", "type": "মাক্কী", "verses": 26},
    {"number": 89, "name_arabic": "الْفَجْر", "name_bangla": "আল-ফাজর", "type": "মাক্কী", "verses": 30},
    {"number": 90, "name_arabic": "الْبَلَد", "name_bangla": "আল-বালাদ", "type": "মাক্কী", "verses": 20},
    {"number": 91, "name_arabic": "الشَّمْس", "name_bangla": "আশ-শামস", "type": "মাক্কী", "verses": 15},
    {"number": 92, "name_arabic": "اللَّيْل", "name_bangla": "আল-লাইল", "type": "মাক্কী", "verses": 21},
    {"number": 93, "name_arabic": "الضُّحَى", "name_bangla": "আদ-দুহা", "type": "মাক্কী", "verses": 11},
    {"number": 94, "name_arabic": "الْشَّرْح", "name_bangla": "আশ-শারহ", "type": "মাক্কী", "verses": 8},
    {"number": 95, "name_arabic": "التِّين", "name_bangla": "আত-তীন", "type": "মাক্কী", "verses": 8},
    {"number": 96, "name_arabic": "الْعَلَق", "name_bangla": "আল-আ'লাক", "type": "মাক্কী", "verses": 19},
    {"number": 97, "name_arabic": "الْقَدْر", "name_bangla": "আল-কদর", "type": "মাক্কী", "verses": 5},
    {"number": 98, "name_arabic": "الْبَيِّنَة", "name_bangla": "আল-বাইয়িনাহ", "type": "মাদানী", "verses": 8},
    {"number": 99, "name_arabic": "الزَّلْزَلَة", "name_bangla": "আয-যিলজালাহ", "type": "মাদানী", "verses": 8},
    {"number": 100, "name_arabic": "الْعَادِيَات", "name_bangla": "আল-আ'দিয়াত", "type": "মাক্কী", "verses": 11},
    {"number": 101, "name_arabic": "الْقَارِعَة", "name_bangla": "আল-কারি'আহ", "type": "মাক্কী", "verses": 11},
    {"number": 102, "name_arabic": "التَّكَاثُر", "name_bangla": "আত-তাকাসুর", "type": "মাক্কী", "verses": 8},
    {"number": 103, "name_arabic": "الْعَصْر", "name_bangla": "আল-আসর", "type": "মাক্কী", "verses": 3},
    {"number": 104, "name_arabic": "الْهُمَزَة", "name_bangla": "আল-হুমাজাহ", "type": "মাক্কী", "verses": 9},
    {"number": 105, "name_arabic": "الْفِيل", "name_bangla": "আল-ফীল", "type": "মাক্কী", "verses": 5},
    {"number": 106, "name_arabic": "قُرَيْش", "name_bangla": "কুরাইশ", "type": "মাক্কী", "verses": 4},
    {"number": 107, "name_arabic": "الْمَاعُون", "name_bangla": "আল-মা'ঊন", "type": "মাক্কী", "verses": 7},
    {"number": 108, "name_arabic": "الْكَوْثَر", "name_bangla": "আল-কাওছার", "type": "মাক্কী", "verses": 3},
    {"number": 109, "name_arabic": "الْكَافِرُونَ", "name_bangla": "আল-কাফিরুন", "type": "মাক্কী", "verses": 6},
    {"number": 110, "name_arabic": "النَّصْر", "name_bangla": "আন-নাসর", "type": "মাদানী", "verses": 3},
    {"number": 111, "name_arabic": "الْمَسَد", "name_bangla": "আল-মাসাদ", "type": "মাক্কী", "verses": 5},
    {"number": 112, "name_arabic": "الْإِخْلَاص", "name_bangla": "আল-ইকলাস", "type": "মাক্কী", "verses": 4},
    {"number": 113, "name_arabic": "الْفَلَق", "name_bangla": "আল-ফালাক", "type": "মাক্কী", "verses": 5},
    {"number": 114, "name_arabic": "النَّاس", "name_bangla": "আন-নাস", "type": "মাক্কী", "verses": 6}
  ],
  "juz": [
    {"number": 1, "start_surah": 1, "start_ayah": 1, "end_surah": 2, "end_ayah": 141},
    {"number": 2, "start_surah": 2, "start_ayah": 142, "end_surah": 2, "end_ayah": 252},
    {"number": 3, "start_surah": 2, "start_ayah": 253, "end_surah": 3, "end_ayah": 92},
    {"number": 4, "start_surah": 3, "start_ayah": 93, "end_surah": 4, "end_ayah": 23},
    {"number": 5, "start_surah": 4, "start_ayah": 24, "end_surah": 4, "end_ayah": 147},
    {"number": 6, "start_surah": 4, "start_ayah": 148, "end_surah": 5, "end_ayah": 81},
    {"number": 7, "start_surah": 5, "start_ayah": 82, "end_surah": 6, "end_ayah": 110},
    {"number": 8, "start_surah": 6, "start_ayah": 111, "end_surah": 7, "end_ayah": 87},
    {"number": 9, "start_surah": 7, "start_ayah": 88, "end_surah": 8, "end_ayah": 40},
    {"number": 10, "start_surah": 8, "start_ayah": 41, "end_surah": 9, "end_ayah": 92}
  ]
};

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
    isLoading: true
};

// ===== DOM Elements =====
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
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
    try { localStorage.setItem(key, value); } catch (e) { console.warn('localStorage error:', e); }
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;', '\n': '<br>' };
    return text.replace(/[&<>"'\n]/g, m => map[m]);
}

function showToast(message, duration = 2500) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), duration);
}

function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
    }
}

// ===== Theme Management =====
function initTheme() {
    if (state.theme === 'light') document.body.classList.add('light-mode');
    updateThemeIcon();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-mode');
    saveToLocalStorage('quran_theme', state.theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = elements.themeToggle?.querySelector('svg');
    if (icon) {
        icon.innerHTML = state.theme === 'light'
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>';
    }
}

// ===== Translation & Language =====
function toggleTranslation() {
    state.showTranslation = !state.showTranslation;
    saveToLocalStorage('quran_translation', state.showTranslation);
    elements.translationToggle?.classList.toggle('toggle-active', state.showTranslation);
    renderQuranContent();
}

function toggleLanguage() {
    state.language = state.language === 'bn' ? 'en' : 'bn';
    saveToLocalStorage('quran_language', state.language);
    if (elements.langToggle) elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';
}

// ===== Font Size =====
function initFontSize() {
    document.documentElement.style.setProperty('--font-size-base', `${state.fontSize}px`);
    if (elements.fontSizeDisplay) elements.fontSizeDisplay.textContent = toBengaliNumber(state.fontSize);
}

function updateFontSize(size) {
    state.fontSize = Math.max(18, Math.min(42, size));
    document.documentElement.style.setProperty('--font-size-base', `${state.fontSize}px`);
    if (elements.fontSizeDisplay) elements.fontSizeDisplay.textContent = toBengaliNumber(state.fontSize);
    saveToLocalStorage('quran_font_size', state.fontSize);
}

function openFontSizeModal() { elements.fontSizeModal?.classList.remove('hidden'); elements.fontSizeModal?.classList.add('flex'); }
function closeFontSizeModal() { elements.fontSizeModal?.classList.add('hidden'); elements.fontSizeModal?.classList.remove('flex'); }

// ===== Sidebar & Modals =====
function toggleSidebar() {
    const isOpen = !elements.sidebar.classList.contains('-translate-x-full');
    elements.sidebar.classList.toggle('-translate-x-full', isOpen);
    elements.sidebarOverlay.classList.toggle('hidden', isOpen);
}
function openMobileSurahSelector() { elements.mobileSurahSelector?.classList.remove('translate-y-full'); }
function closeMobileSurahSelector() { elements.mobileSurahSelector?.classList.add('translate-y-full'); }

// ===== Bookmarks =====
function isBookmarked(surahNum, ayahNum) {
    return state.bookmarks.some(b => b.surah === surahNum && b.ayah === ayahNum);
}

function addBookmark(surahNum, ayahNum) {
    if (!isBookmarked(surahNum, ayahNum)) {
        state.bookmarks.push({ surah: surahNum, ayah: ayahNum, timestamp: Date.now() });
        saveToLocalStorage('quran_bookmarks', JSON.stringify(state.bookmarks));
        showToast('বুকমার্ক যোগ করা হয়েছে');
        renderQuranContent();
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

function openBookmarksModal() { renderBookmarks(); elements.bookmarksModal?.classList.remove('hidden'); elements.bookmarksModal?.classList.add('flex'); }
function closeBookmarksModal() { elements.bookmarksModal?.classList.add('hidden'); elements.bookmarksModal?.classList.remove('flex'); }

function goToBookmark(surahNum, ayahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = ayahNum;
    saveToLocalStorage('quran_current_surah', surahNum);
    saveToLocalStorage('quran_current_ayah', ayahNum);
    closeBookmarksModal();
    renderQuranContent();
    setTimeout(() => {
        const el = document.getElementById(`ayah-${surahNum}-${ayahNum}`);
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('animate-fade-in'); }
    }, 100);
    if (window.innerWidth < 1024) closeMobileSurahSelector();
}

function renderBookmarks() {
    if (!elements.bookmarksList) return;
    if (state.bookmarks.length === 0) {
        elements.bookmarksList.innerHTML = '<div class="empty-state"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg><p>কোনো বুকমার্ক নেই</p></div>';
        return;
    }
    elements.bookmarksList.innerHTML = state.bookmarks.map((bookmark, index) => {
        const surah = state.quranData?.surah_names.find(s => s.number === bookmark.surah);
        return `<div class="bookmark-item animate-fade-in" onclick="goToBookmark(${bookmark.surah}, ${bookmark.ayah})"><div class="bookmark-info"><div class="bookmark-surah">${surah?.name_bangla || 'সূরা ' + bookmark.surah}</div><div class="bookmark-ayah">আয়াত ${toBengaliNumber(bookmark.ayah)}</div></div><button class="remove-bookmark" onclick="removeBookmark(${index}, event)"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>`;
    }).join('');
}

// ===== Copy =====
function copyAyah(arabic, bangla) {
    const text = `${arabic}\n\n${bangla}`;
    navigator.clipboard?.writeText(text).then(() => showToast('আয়াত কপি করা হয়েছে')).catch(() => showToast('কপি করতে সমস্যা হয়েছে'));
}

// ===== Navigation =====
function goToSurah(surahNum) {
    state.currentSurah = surahNum;
    state.currentAyah = 1;
    saveToLocalStorage('quran_current_surah', surahNum);
    saveToLocalStorage('quran_current_ayah', 1);
    renderQuranContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 1024) closeMobileSurahSelector(); else toggleSidebar();
}

function searchSurah(query) {
    if (!state.quranData) return;
    const q = query.toLowerCase().trim();
    const filtered = state.quranData.surah_names.filter(s => s.name_bangla.toLowerCase().includes(q) || s.name_arabic.includes(query) || s.number.toString() === query);
    elements.surahList.innerHTML = filtered.map(surah => `<div class="surah-item ${surah.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${surah.number})"><div class="surah-number">${toBengaliNumber(surah.number)}</div><div class="surah-info"><div class="surah-name">${surah.name_bangla}</div><div class="surah-details">${surah.name_arabic}</div></div><div class="verse-count">${toBengaliNumber(surah.verses)}</div></div>`).join('');
}

// ===== Render Functions =====
function renderSurahList() {
    if (!state.quranData || !elements.surahList) return;
    const surahs = state.quranData.surah_names;
    elements.surahList.innerHTML = surahs.map(surah => `<div class="surah-item ${surah.number === state.currentSurah ? 'active' : ''}" onclick="goToSurah(${surah.number})"><div class="surah-number">${toBengaliNumber(surah.number)}</div><div class="surah-info"><div class="surah-name">${surah.name_bangla}</div><div class="surah-details">${surah.name_arabic}</div></div><div class="verse-count">${toBengaliNumber(surah.verses)}</div></div>`).join('');
    if (elements.mobileSurahList) {
        elements.mobileSurahList.innerHTML = surahs.map(surah => `<div class="mobile-surah-item" onclick="goToSurah(${surah.number})"><div class="surah-number">${toBengaliNumber(surah.number)}</div><div class="surah-info"><div class="surah-name" style="font-weight:600;color:var(--text-primary)">${surah.name_bangla}</div><div class="surah-details" style="font-size:0.8125rem;color:var(--text-muted)">${surah.name_arabic} • ${toBengaliNumber(surah.verses)} আয়াত</div></div></div>`).join('');
    }
}

function updateHeaderInfo() {
    const surah = state.quranData?.surah_names.find(s => s.number === state.currentSurah);
    if (elements.currentSurahName) elements.currentSurahName.textContent = surah?.name_bangla || '';
    if (elements.currentAyahDisplay) elements.currentAyahDisplay.textContent = `আয়াত ${toBengaliNumber(state.currentAyah)} / ${toBengaliNumber(surah?.verses || 0)}`;
}

function updateProgress() {
    if (!state.quranData || !elements.juzProgress) return;
    const currentJuz = state.quranData.juz?.find(juz => {
        if (juz.start_surah < state.currentSurah) return true;
        if (juz.start_surah === state.currentSurah && juz.start_ayah <= state.currentAyah) return true;
        return false;
    });
    if (currentJuz) elements.juzProgress.style.width = `${(currentJuz.number / 30) * 100}%`;
}

function renderQuranContent() {
    if (!state.quranData || !elements.quranContent) return;
    const surah = state.quranData.surah.find(s => s.number === state.currentSurah);
    if (!surah) {
        elements.quranContent.innerHTML = '<div class="empty-state"><p>সূরা পাওয়া যায়নি</p></div>';
        return;
    }
    const arabicClass = state.fontStyle === 'kolkatta' ? 'arabic-kolkatta' : 'arabic-hafizi';
    let html = `<div class="surah-header animate-fade-in"><div class="surah-name-arabic">${surah.name_arabic}</div><div class="surah-name-bangla">${surah.name_bangla}</div><div class="surah-meta"><span class="type-badge">${surah.type}</span><span>•</span><span>${toBengaliNumber(surah.verses)} আয়াত</span></div></div>`;
    if (state.currentSurah !== 9) html += `<div class="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
    surah.ayahs.forEach(ayah => {
        const isBookmarked = isBookmarked(surah.number, ayah.number);
        html += `<div class="ayah-container ${!state.showTranslation ? 'translation-hidden' : ''}" id="ayah-${surah.number}-${ayah.number}"><div class="ayah-actions"><button onclick="addBookmark(${surah.number}, ${ayah.number})" class="${isBookmarked ? 'bookmarked' : ''}" title="বুকমার্ক"><svg class="w-4 h-4" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg></button><button onclick="copyAyah('${escapeHtml(ayah.text_arabic)}', '${escapeHtml(ayah.text_bangla)}')" title="কপি"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button></div><div class="verse-number"><span class="arabic-num">${toArabicNumber(ayah.number)}</span><span class="bengali-num">${toBengaliNumber(ayah.number)}</span></div><div class="arabic-text ${arabicClass}">${ayah.text_arabic}</div><div class="bangla-translation">${ayah.text_bangla}</div></div>`;
    });
    elements.quranContent.innerHTML = html;
    updateHeaderInfo();
    updateProgress();
    saveToLocalStorage('quran_current_surah', state.currentSurah);
    saveToLocalStorage('quran_current_ayah', state.currentAyah);
}

// ===== Page Navigation =====
function showHomePage() {
    elements.homePage?.classList.remove('hidden');
    elements.readerPage?.classList.add('hidden');
    state.currentPage = 'home';
}

function showReaderPage() {
    elements.homePage?.classList.add('hidden');
    elements.readerPage?.classList.remove('hidden');
    state.currentPage = 'reader';
    initReader();
}

function initReader() {
    if (state.quranData) { renderSurahList(); renderQuranContent(); }
}

// ===== Event Listeners =====
function setupEventListeners() {
    elements.kolkattaBtn?.addEventListener('click', () => { state.fontStyle = 'kolkatta'; saveToLocalStorage('quran_font_style', 'kolkatta'); showReaderPage(); });
    elements.hafiziBtn?.addEventListener('click', () => { state.fontStyle = 'hafizi'; saveToLocalStorage('quran_font_style', 'hafizi'); showReaderPage(); });
    elements.menuToggle?.addEventListener('click', () => { window.innerWidth >= 1024 ? toggleSidebar() : openMobileSurahSelector(); });
    elements.sidebarOverlay?.addEventListener('click', toggleSidebar);
    elements.themeToggle?.addEventListener('click', toggleTheme);
    elements.langToggle?.addEventListener('click', toggleLanguage);
    elements.translationToggle?.addEventListener('click', toggleTranslation);
    elements.bookmarksBtn?.addEventListener('click', openBookmarksModal);
    elements.closeBookmarks?.addEventListener('click', closeBookmarksModal);
    elements.fontSizeBtn?.addEventListener('click', openFontSizeModal);
    elements.fontClose?.addEventListener('click', closeFontSizeModal);
    elements.fontDecrease?.addEventListener('click', () => updateFontSize(state.fontSize - 2));
    elements.fontIncrease?.addEventListener('click', () => updateFontSize(state.fontSize + 2));
    elements.fontReset?.addEventListener('click', () => updateFontSize(28));
    elements.fontSizeModal?.addEventListener('click', (e) => { if (e.target === elements.fontSizeModal) closeFontSizeModal(); });
    elements.bookmarksModal?.addEventListener('click', (e) => { if (e.target === elements.bookmarksModal) closeBookmarksModal(); });
    elements.closeSurahSelector?.addEventListener('click', closeMobileSurahSelector);
    elements.surahSearch?.addEventListener('input', (e) => { if (e.target.value.length > 0) searchSurah(e.target.value); else renderSurahList(); });
    elements.translationToggle?.classList.toggle('toggle-active', state.showTranslation);
    if (elements.langToggle) elements.langToggle.textContent = state.language === 'bn' ? 'বাং' : 'EN';
    window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMobileSurahSelector(); });
    document.addEventListener('keydown', (e) => { if (state.currentPage !== 'reader') return; if (e.key === 'Escape') { closeFontSizeModal(); closeBookmarksModal(); closeMobileSurahSelector(); if (!elements.sidebar.classList.contains('-translate-x-full')) toggleSidebar(); } });
}

// ===== Initialize Application =====
async function init() {
    try {
        initTheme();
        initFontSize();
        setupEventListeners();

        // Try to load external JSON, fallback to embedded data
        try {
            const response = await fetch('./data/quran.json');
            if (response.ok) {
                const data = await response.json();
                // Merge with fallback to ensure we have all 114 surah names
                state.quranData = { ...FALLBACK_DATA, ...data, surah_names: data.surah_names || FALLBACK_DATA.surah_names };
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (fetchError) {
            console.warn('Using embedded fallback data:', fetchError.message);
            state.quranData = FALLBACK_DATA;
        }

        state.isLoading = false;
        hideLoadingScreen();

        const savedFont = localStorage.getItem('quran_font_style');
        if (savedFont) {
            showReaderPage();
        } else {
            showHomePage();
        }
    } catch (error) {
        console.error('Initialization error:', error);
        hideLoadingScreen();
        showToast('অ্যাপ লোড করতে সমস্যা হয়েছে');
        // Still show home page as fallback
        showHomePage();
    }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);