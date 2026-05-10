# Quran Bangla (কুরআন বাংলা) - Specification Document

## 1. Project Overview

- **Project Name**: Quran Bangla (কুরআন বাংলা)
- **Type**: Single-page web application (PWA-ready)
- **Core Functionality**: Quran reader with Bangla translation, dual font styles, and offline capability
- **Target Users**: Bangla-speaking Muslims who want to read Quran with translation

## 2. UI/UX Specification

### Layout Structure

#### Home Page (Font Selection)
- Full-screen centered layout
- Two large selection cards vertically stacked
- Each card: 280px width, 160px height, centered
- Cards contain: title (Bangla), subtitle (English), decorative border
- Fade-in animation on load

#### Main Reader Page
- **Header (Fixed)**: 60px height, contains title, current surah/ayah info
- **Sidebar (Desktop)**: 320px width, Surah list, collapsible
- **Main Content**: Scrollable, contains ayahs
- **Mobile**: Bottom sheet for Surah selection (300px height)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Visual Design

#### Color Palette
- **Dark Mode (Default)**:
  - Background Primary: `#0a0f0d` (deep green-black)
  - Background Secondary: `#111916` (dark green)
  - Surface: `#1a2420` (card background)
  - Primary Accent: `#2dd4bf` (teal/cyan)
  - Secondary Accent: `#fbbf24` (gold)
  - Text Primary: `#e8f5f1` (off-white green)
  - Text Secondary: `#6b8f85` (muted green)
  - Border: `#2a3d35`

- **Light Mode**:
  - Background Primary: `#f8faf9`
  - Background Secondary: `#ffffff`
  - Surface: `#f1f5f3`
  - Primary Accent: `#0d9488`
  - Secondary Accent: `#b45309`
  - Text Primary: `#1a2e29`
  - Text Secondary: `#5c7a70`

#### Typography
- **Arabic Font (Kolkatta)**: "Amiri" - 32px base, line-height 2.2
- **Arabic Font (Hafizi)**: "Scheherazade New" - 32px base, line-height 2.0
- **Bangla Font**: "Hind Siliguri" - 18px base, line-height 1.8
- **UI Font**: "Noto Sans Bengali" - 14px
- **Surah Title**: "Noto Sans Bengali" - 24px bold

#### Spacing System
- Base unit: 4px
- Content padding: 24px (mobile: 16px)
- Card padding: 20px
- Gap between elements: 16px

#### Visual Effects
- Card hover: scale(1.02), box-shadow increase
- Button press: scale(0.98)
- Page transitions: 300ms fade
- Scroll behavior: smooth
- Glassmorphism on header: backdrop-blur-lg

### Components

#### Font Selection Card
- States: default, hover, selected
- Default: border `#2a3d35`, background `#1a2420`
- Hover: border `#2dd4bf`, glow effect
- Selected: border `#fbbf24` (gold), checkmark icon

#### Surah List Item
- States: default, active, hover
- Shows: Surah number (Bengali), name (Arabic + Bangla), verse count
- Active: background highlight, left border accent

#### Ayah Card
- Arabic text (large, centered)
- Verse number (top-right, small, muted)
- Bangla translation (below, toggleable)
- Hover: slight background change

#### Control Buttons
- Icon buttons: 40px × 40px
- Rounded corners (8px)
- Hover: background highlight
- Active: pressed state

## 3. Functionality Specification

### Core Features

#### Font Selection (Home Page)
- Two options: "কলিকাতা ছাপা" (Kolkatta) / "হাফিজি ছাপা" (Hafizi)
- Click saves to localStorage `quran_font_style`
- Navigate to reader page with selected font
- Persist selection across sessions

#### Quran Reader
- Display Arabic text with selected font style
- Show Bangla translation below each verse
- Toggle translation visibility
- Show verse numbers in both Arabic (١٢٣) and Bengali (১২৩)

#### Surah Navigation
- Desktop: Fixed sidebar with full Surah list
- Mobile: Bottom sheet / dropdown
- Click Surah to jump to that position
- Show Surah name, verse count, Makki/Madani indicator

#### Header Controls
- **Left**: Current Surah name + Ayah number
- **Right (icons)**:
  - Language toggle (বাংলা ↔ English UI labels)
  - Dark/Light mode toggle
  - Translation toggle (show/hide Bangla)
  - Settings (future expansion)

#### Search
- Search Surah by name (Bangla or Arabic)
- Filter Surah list in real-time

#### Bookmark
- Bookmark current ayah
- View bookmarked ayahs list
- Persist in localStorage

#### Copy Ayah
- Copy Arabic + Bangla to clipboard
- Show toast confirmation

#### Progress Indicator
- Show current Juz/Para
- Visual progress bar

### Data Handling

#### localStorage Keys
- `quran_font_style`: "kolkatta" | "hafizi"
- `quran_theme`: "dark" | "light"
- `quran_translation`: boolean
- `quran_language`: "bn" | "en"
- `quran_bookmarks`: JSON array of {surah, ayah}
- `quran_last_read`: {surah, ayah, timestamp}
- `quran_progress`: {juz, page}

#### Data Structure (quran.json)
```json
{
  "surahs": [
    {
      "number": 1,
      "name_arabic": "আল-ফাতিহা",
      "name_bangla": "আল-ফাতিহা",
      "name_english": "Al-Fatihah",
      "type": "Makki",
      "verses": 7,
      "ayahs": [
        {"number": 1, "text_arabic": "...", "text_bangla": "..."}
      ]
    }
  ]
}
```

### Edge Cases
- Handle missing translation gracefully
- Fallback fonts if custom fonts fail to load
- Handle offline mode with cached data
- Preserve scroll position on navigation

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme displays deep green/gold color scheme
- [ ] Light theme shows clean off-white/green scheme
- [ ] Font selection cards are clearly visible and tappable
- [ ] Arabic text renders correctly with proper RTL alignment
- [ ] Bangla text displays with Hind Siliguri font
- [ ] Responsive layout works on 320px - 1920px screens

### Functional Checkpoints
- [ ] Clicking font option saves to localStorage
- [ ] Surah list shows all 114 Surahs
- [ ] Clicking Surah scrolls to correct position
- [ ] Translation toggle hides/shows Bangla text
- [ ] Theme toggle switches between dark/light
- [ ] Language toggle changes UI labels
- [ ] Bookmark saves current position
- [ ] Copy copies ayah to clipboard
- [ ] Last read position restores on page load

### Performance Checkpoints
- [ ] Initial page load < 3 seconds
- [ ] Smooth scrolling (60fps)
- [ ] No layout shift during font loading
- [ ] Animations are smooth

## 5. File Structure

```
F:\claudeProjects\banglaQuran\
├── index.html
├── style.css
├── script.js
├── data/
│   └── quran.json
└── SPEC.md
```

## 6. External Resources

### Fonts (Google Fonts)
- Amiri: https://fonts.googleapis.com/css2?family=Amiri:wght@400;700
- Scheherazade New: https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700
- Hind Siliguri: https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700
- Noto Sans Bengali: https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;700

### Icons
- Use inline SVG icons for zero dependencies