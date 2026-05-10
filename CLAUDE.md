# Quran Bangla - Development Guide

## Project Overview
- **Name**: কুরআন বাংলা (Quran Bangla)
- **Type**: Modern Quran Web Application
- **API**: https://api.quran.com/api/v4
- **Goal**: Match Quran.com quality with Bangla translation

## Tech Stack
- HTML5 + Tailwind CSS (CDN)
- Vanilla JavaScript (ES6+)
- API-based data fetching

## Features
1. Font Selection: কলিকাতা ছাপা / হাফিজি ছাপা
2. API Integration: Real Quran data from api.quran.com
3. Bengali Translation (Translation ID: 161)
4. Audio Player with multiple reciters
5. Search functionality
6. Bookmarks
7. Settings: Font size, theme, reciter
8. Dark/Light theme
9. Responsive design
10. Progress indicator

## API Endpoints Used
- `/chapters` - List all 114 surahs
- `/chapters/{id}/verses` - Get verses with Arabic
- `?translations={id}` - Get Bengali translation

## Key Files
- index.html - Main HTML structure
- style.css - Custom styles
- script.js - Application logic

## localStorage Keys
- quran_font_style: "kolkatta" | "hafizi"
- quran_theme: "dark" | "light"
- quran_translation: boolean
- quran_arabic_size: number
- quran_bangla_size: number
- quran_reciter: string
- quran_bookmarks: JSON array
- quran_current_surah: number
- quran_current_ayah: number

## Available Reciters
- ar.alafasy: মিশারি আল আফাসি
- ar.husary: হোসারি মুখতার
- ar.abdulbasit: আব্দুল বাসিত
- ar.shaatree: শাত্রী

## Notes
- Audio files from https://verses.quran.com
- Translation ID 161 = Muhammad Farooq (Bengali)
- Uses Amiri font for Kolkatta style
- Uses Scheherazade New for Hafizi style
- Uses Hind Siliguri for Bangla text