# Quran Bangla - Development Guide

## Project Overview
- **Name**: কুরআন বাংলা (Quran Bangla)
- **Type**: Mobile-first Quran web application
- **Inspiration**: banglaquran.netlify.app but more polished
- **Goal**: Premium, elegant, spiritual reading experience

## Tech Stack
- HTML5 + Tailwind CSS (CDN) + Vanilla JavaScript
- PWA-ready with service worker
- Local storage for persistence

## Key Features

### Font Selection (Homepage)
- Two cards: কলিকাতা ছাপা (Kolkatta) / হাফিজি ছাপা (Hafizi)
- Saves to localStorage `quran_font_style`

### Main Reader
- Fixed top bar with Surah name + current ayah
- Surah list (sidebar on desktop, bottom sheet on mobile)
- Searchable surah list
- Large Arabic text (use Amiri for Kolkatta, Scheherazade for Hafizi)
- Bangla translation (taisirul quran) below each ayah
- Translation toggle button
- Language toggle (বাংলা ↔ English)
- Dark/Light theme toggle
- Font size adjuster
- Audio player (per ayah)
- Bookmark feature
- Copy ayah feature
- Last read position auto-save
- Juz progress indicator

### Data Source
- Translation: তাইসিরুল কুরআন (Taisirul Quran) by Dr. মুহিউদ্দীন খান
- Full JSON structure with 114 surahs

## Design System

### Colors (Dark Mode - Default)
- Background: `#0a0f0d` (deep green-black)
- Surface: `#111916`
- Card: `#1a2420`
- Accent: `#2dd4bf` (teal)
- Gold: `#fbbf24`
- Text: `#e8f5f1`
- Muted: `#6b8f85`

### Colors (Light Mode)
- Background: `#f8faf9`
- Surface: `#ffffff`
- Accent: `#0d9488`
- Gold: `#b45309`

### Typography
- Arabic Kolkatta: Amiri (32px, line-height 2.2)
- Arabic Hafizi: Scheherazade New (32px, line-height 2.0)
- Bangla: Hind Siliguri (18px, line-height 1.8)
- UI: Noto Sans Bengali

## File Structure
```
banglaQuran/
├── index.html
├── style.css
├── script.js
├── manifest.json
├── sw.js
├── data/
│   └── quran.json
└── CLAUDE.md
```

## localStorage Keys
- `quran_font_style`: "kolkatta" | "hafizi"
- `quran_theme`: "dark" | "light"
- `quran_translation`: boolean
- `quran_language`: "bn" | "en"
- `quran_bookmarks`: JSON array
- `quran_last_read`: {surah, ayah}
- `quran_font_size`: number

## Important Notes
- Always use Bengali numbers (০১২৩...) for display
- Use Arabic numbers (٠١٢٣...) inside ayah circles
- Bismillah should appear at start of all surahs except Surah 9
- Audio files should be from a reliable source (e.g., Mishary Rashid)
- Ensure RTL for Arabic text