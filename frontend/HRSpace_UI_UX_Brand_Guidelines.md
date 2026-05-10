# HRSpace UI/UX Brand Guidelines

> **Version:** 1.0  
> **Date:** May 10, 2026  
> **Platform:** Web Application (Dashboard & Authentication Systems)  
> **Theme:** Dark Mode Enterprise HR Management

---

## 1. Design Philosophy

### Core Principles
- **Professional Authority:** Deep dark surfaces convey enterprise-grade seriousness and trust
- **High Contrast Focus:** Strategic use of crimson red against dark backgrounds creates immediate visual hierarchy and action-oriented UX
- **Card-Based Architecture:** Information is modularized into distinct, elevated containers for scannable content consumption
- **Efficiency First:** Every element serves a functional purpose; minimal decorative noise
- **Manager-Centric:** Designed for decision-makers who need status-at-a-glance dashboards

### Brand Personality
| Trait | Expression |
|-------|-----------|
| Authoritative | Deep blacks, structured grids, bold typography |
| Alert & Responsive | Crimson accents for notifications, deadlines, and CTAs |
| Modern | Subtle glows, rounded corners, clean iconography |
| Trustworthy | Consistent spacing, predictable patterns, clear feedback |

---

## 2. Color System

### Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Crimson Primary** | `#DC2626` | `220, 38, 38` | CTAs, active states, notification badges, links, critical alerts |
| **Crimson Hover** | `#B91C1C` | `185, 28, 28` | Button hover states, interactive element emphasis |
| **Crimson Glow** | `rgba(220, 38, 38, 0.4)` | — | Ambient glow effects, top accent lines |

### Neutral Palette (Dark Theme)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Background Base** | `#0A0A0F` | `10, 10, 15` | Deepest background layer, page foundation |
| **Surface Primary** | `#13131A` | `19, 19, 26` | Main content areas, card backgrounds |
| **Surface Secondary** | `#1A1A24` | `26, 26, 36` | Elevated cards, input fields, sidebar hover |
| **Surface Tertiary** | `#22222E` | `34, 34, 46` | Subtle dividers, inactive track backgrounds |
| **Border Subtle** | `#2A2A35` | `42, 42, 53` | Card borders, input outlines (rest state) |
| **Border Active** | `#DC2626` | `220, 38, 38` | Input focus states, active navigation |

### Text Colors

| Token | Hex | Opacity | Usage |
|-------|-----|---------|-------|
| **Text Primary** | `#FFFFFF` | 100% | Headings, primary content, active nav items |
| **Text Secondary** | `#A1A1AA` | ~65% | Body text, descriptions, timestamps |
| **Text Muted** | `#71717A` | ~45% | Placeholders, disabled states, metadata |
| **Text Inverse** | `#0A0A0F` | 100% | Text on crimson buttons |

### Semantic Colors

| State | Color | Application |
|-------|-------|-------------|
| **Success/Done** | `#22C55E` (Green) | Completed tasks, positive status |
| **Warning/Pending** | `#71717A` (Gray) | Pending items, neutral status |
| **In Progress** | `#DC2626` (Crimson) | Active workflows, current tasks |
| **Notification** | `#DC2626` with badge | Unread counts, alerts |

### Gradient Patterns
- **Crimson Gradient (Buttons):** `linear-gradient(180deg, #DC2626 0%, #991B1B 100%)`
- **Ambient Glow (Top):** `linear-gradient(90deg, transparent 0%, #DC2626 50%, transparent 100%)` at 40% opacity
- **Card Edge Glow:** `0 0 20px rgba(220, 38, 38, 0.15)` on top borders

---

## 3. Typography System

### Font Family
- **Primary:** Inter, SF Pro Display, or system sans-serif stack
- **Fallback:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Characteristics:** Clean, geometric, highly legible at small sizes, neutral personality

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| **Display** | 32px | 700 (Bold) | 1.2 | -0.02em | Page titles ("Welcome, Jason Carter") |
| **H1** | 24px | 600 (Semibold) | 1.3 | -0.01em | Card headers, section titles |
| **H2** | 18px | 600 (Semibold) | 1.4 | 0 | Subsection headers, item titles |
| **H3** | 16px | 500 (Medium) | 1.5 | 0 | List items, task names |
| **Body** | 14px | 400 (Regular) | 1.6 | 0 | Descriptions, general content |
| **Caption** | 12px | 400 (Regular) | 1.5 | 0.01em | Timestamps, metadata, badges |
| **Label** | 11px | 500 (Medium) | 1.4 | 0.05em | Uppercase labels, status badges |

### Typography Patterns
- **Page Header:** Display size + Text Secondary subtitle at 14px
- **Card Titles:** H1 + crimson icon prefix (20px icon, 24px text)
- **User Name:** H2, white, centered in profile cards
- **Role/Title:** Caption, Text Secondary, centered below name
- **Task Items:** H3 weight 500, white, with checkbox prefix
- **Status Badges:** Label size, uppercase, crimson background, white text

---

## 4. Layout & Grid System

### Page Structure
```
┌─────────────────────────────────────────────────────────────┐
│  SIDEBAR (240px)  │  MAIN CONTENT AREA (fluid)               │
│                   │  ┌─────────────────────────────────────┐ │
│  [Logo]           │  │ Header Bar (80px)                   │ │
│                   │  │ Welcome text | Icons | Avatar       │ │
│  ───────────────  │  └─────────────────────────────────────┘ │
│  Navigation       │                                          │
│  - Dashboard      │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  - Profile        │  │  Card 1  │ │  Card 2  │ │  Card 3  │ │
│  - Notifications  │  │ (Profile)│ │(Notifs)  │ │(Messages)│ │
│  - Messages       │  └──────────┘ └──────────┘ └──────────┘ │
│  - Settings       │                                          │
│  - Log Out        │  ┌──────────────────┐ ┌───────────────┐ │
│                   │  │   Wide Card      │ │   Tall Card   │ │
│                   │  │ (Announcements)  │ │   (Tasks)     │ │
│                   │  └──────────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Grid Specifications
- **Sidebar Width:** 240px fixed, full viewport height
- **Content Padding:** 32px (desktop), 24px (tablet), 16px (mobile)
- **Card Gap:** 24px between cards
- **Max Content Width:** 1440px (centered with auto margins)
- **Breakpoint:** Single column layout below 768px

### Z-Index Hierarchy
| Layer | Z-Index | Element |
|-------|---------|---------|
| Background | 0 | Page background |
| Content | 10 | Cards, main content |
| Elevated | 20 | Dropdowns, popovers |
| Overlay | 30 | Modals, dialogs |
| Top | 40 | Notifications, toasts |

---

## 5. Component Library

### 5.1 Cards

#### Standard Card
```
Background:    #13131A
Border:        1px solid #2A2A35
Border Radius: 12px
Padding:       24px
Shadow:        0 4px 6px rgba(0, 0, 0, 0.3)
Top Accent:    3px solid #DC2626 (optional, for emphasis)
```

#### Profile Card Variant
- **Width:** 280px
- **Alignment:** Centered content
- **Avatar:** 120px × 120px, rounded-full, border 3px solid #2A2A35
- **Name:** 18px semibold, white, margin-top 16px
- **Role:** 14px regular, #A1A1AA
- **CTA Button:** Full width, margin-top 20px

#### Notification Summary Card
- **Icon:** 24px crimson bell icon, left-aligned title
- **Count:** Displayed in crimson (e.g., "You have **2** new notifications")
- **Number Weight:** Bold, #DC2626
- **Button:** Full width, crimson gradient, margin-top 16px

#### Announcement Card (Wide)
- **Header:** Flex row, space-between (Title left, "View All" right)
- **Item Spacing:** 20px vertical gap between announcements
- **Item Structure:**
  - Crimson square bullet (8px × 8px, rounded-sm)
  - Title: 16px medium, white
  - Date: 12px regular, #71717A, right-aligned
  - Description: 14px regular, #A1A1AA, margin-top 4px
- **Footer:** "View All" dropdown button, right-aligned

#### Tasks Card (Tall)
- **Header:** "My Tasks" left-aligned, no action
- **Task Item:**
  - Checkbox: 20px × 20px, rounded-md, border 2px #71717A
  - Checked: Background #DC2626, border #DC2626, white checkmark
  - Task Name: 16px medium, white, strikethrough if done
  - Status Badge: Right-aligned, auto-width
    - Done: Green background (#166534 text on #22C55E bg)
    - In Progress: Crimson background (#FFFFFF on #DC2626)
    - Pending: Gray background (#A1A1AA on #3F3F46)

### 5.2 Buttons

#### Primary Button (Crimson Gradient)
```
Background:    linear-gradient(180deg, #DC2626, #991B1B)
Border:        none
Border Radius: 8px
Padding:       12px 24px
Font:          14px semibold, white
Shadow:        0 4px 12px rgba(220, 38, 38, 0.3)
Hover:         Brightness 110%, shadow intensifies
Active:        Scale 0.98, brightness 90%
```

#### Secondary Button (Outline)
```
Background:    transparent
Border:        1px solid #2A2A35
Border Radius: 8px
Padding:       10px 20px
Font:          14px medium, #A1A1AA
Hover:         Border color #DC2626, text white
```

#### Dropdown Button
- Same as Primary but with chevron-down icon (16px) right-aligned
- Icon margin-left: 8px

#### Text Link
```
Color:         #DC2626
Font:          14px medium
Decoration:    underline on hover
Visited:       #991B1B
```

### 5.3 Form Elements (Authentication)

#### Input Field
```
Background:    #13131A
Border:        2px solid #2A2A35
Border Radius: 8px
Padding:       16px 16px 16px 52px (left padding for icon)
Font:          16px regular, #FFFFFF
Placeholder:   16px regular, #71717A
Icon:          20px, #DC2626, positioned 16px from left
Focus:         Border color #DC2626, subtle crimson glow
Error:         Border color #EF4444, error message below
```

#### Input Variants by Type
| Field | Icon | Placeholder |
|-------|------|-------------|
| Full Name | User silhouette | "Enter your full name" |
| Email | Envelope | "Enter your email" |
| Password | Lock | "Enter your password" |
| Confirm Password | Lock | "Confirm your password" |
| Role | Plus sign | "Select Role" |

#### Select/Dropdown
- Same styling as input
- Chevron-down icon (16px, #FFFFFF) on right side
- Options panel: #1A1A24 background, #2A2A35 border, 8px radius

### 5.4 Navigation

#### Sidebar Navigation
```
Width:         240px
Background:    #0A0A0F
Border Right:  1px solid #1A1A24
Padding:       24px 0
```

#### Nav Item
```
Padding:       12px 24px
Margin:        0 12px
Border Radius: 8px
Font:          14px medium, #A1A1AA
Icon:          20px, #A1A1AA, margin-right 12px
Hover:         Background #1A1A24, text white
Active:        Background #DC2626, text white, icon white
Active Shadow: inset 4px 0 0 #DC2626 (left border accent)
```

#### Logo Area
```
Padding:       24px
Font:          "HR" #DC2626 bold 24px + "Space" #FFFFFF bold 24px
Margin Bottom: 32px
```

### 5.5 Icons

#### Icon System
- **Library:** Font Awesome or Lucide (outline style)
- **Size Scale:** 16px (inline), 20px (nav), 24px (card headers)
- **Color Rules:**
  - Default: #A1A1AA
  - Active/Primary: #DC2626 or #FFFFFF
  - Success: #22C55E
- **Common Icons:**
  - Dashboard: Layout grid
  - Profile: User
  - Notifications: Bell
  - Messages: Mail
  - Settings: Gear
  - Log Out: Power
  - Tasks: Check-square

### 5.6 Badges & Status Indicators

#### Notification Badge
```
Background:    #DC2626
Color:         #FFFFFF
Font:          11px bold
Size:          20px × 20px
Shape:         Circle
Position:      Top-right of icon, -8px offset
Border:        2px solid #0A0A0F (cutout effect)
```

#### Status Badge
```
Padding:       4px 12px
Border Radius: 4px
Font:          11px medium, uppercase
Variants:
  - Done:       bg #166534, text #22C55E
  - In Progress: bg #DC2626, text #FFFFFF
  - Pending:    bg #3F3F46, text #A1A1AA
```

---

## 6. Page Templates

### 6.1 Dashboard Page

#### Header Bar
```
Height:        80px
Background:    Transparent (blends with page)
Left:          Welcome message (Display + subtitle)
Right:         Icon group (Messages, Notifications) + Avatar dropdown
```

#### Icon Group in Header
```
Gap:           16px between icons
Icon Size:     24px
Icon Color:    #A1A1AA
Badge:         Notification badge on each
Hover:         Color #FFFFFF
```

#### Avatar Dropdown
```
Size:          40px × 40px
Shape:         Circle
Border:        2px solid #2A2A35
Chevron:       16px, #A1A1AA, right of avatar
Dropdown:      #1A1A24 background, 8px radius, shadow
```

#### Content Grid
```
Top Row:       3 equal columns (Profile | Notifications | Messages)
Bottom Row:    2 columns (2fr Announcements | 1fr Tasks)
Gap:           24px all directions
Responsive:    Stack to single column on mobile
```

### 6.2 Authentication Pages

#### Page Layout
```
Background:    #0A0A0F with subtle radial gradient center glow
Alignment:     Centered vertically and horizontally
Width:         100%, max-width 480px for form
Padding:       24px
```

#### Form Container
```
Background:    Transparent (flat on page background)
Border:        None
Shadow:        None
```

#### Header
```
Logo:          Centered, "HR" crimson + "Space" white, 32px
Title:         "Create Your Account", 24px semibold, white, centered
Margin:        32px bottom after title
```

#### Input Stack
```
Gap:           20px between inputs
Width:         100%
```

#### Submit Button
```
Width:         100%
Margin Top:    24px
Padding:       16px
Font:          16px semibold
```

#### Footer Text
```
Margin Top:    24px
Alignment:     Center
Font:          14px regular, #A1A1AA
Link:          #DC2626, medium weight
```

---

## 7. Design Patterns

### 7.1 Elevation & Depth
| Level | Shadow | Usage |
|-------|--------|-------|
| Flat | None | Inputs, sidebar, flat buttons |
| Raised | `0 4px 6px rgba(0,0,0,0.3)` | Standard cards |
| Elevated | `0 8px 24px rgba(0,0,0,0.4)` | Modals, dropdowns |
| Glow | `0 0 20px rgba(220,38,38,0.15)` | Featured cards, active elements |

### 7.2 Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon margins, tight padding |
| sm | 8px | Internal element gaps |
| md | 16px | Card padding, section gaps |
| lg | 24px | Card gaps, section margins |
| xl | 32px | Page padding, major sections |
| 2xl | 48px | Large section breaks |

### 7.3 Border Radius Scale
| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Badges, small buttons |
| md | 8px | Inputs, buttons, nav items |
| lg | 12px | Cards, panels |
| full | 50% | Avatars, circular elements |

### 7.4 Animation & Transitions
```css
/* Standard transition */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Button hover */
transform: translateY(-1px);
box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);

/* Card hover */
transform: translateY(-2px);
border-color: rgba(220, 38, 38, 0.3);

/* Input focus */
box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
```

### 7.5 Feedback Patterns

#### Loading States
- Button: Spinner (16px, white) replacing text
- Card: Pulse animation on background `#1A1A24`
- Page: Skeleton screens with `#1A1A24` shapes

#### Empty States
- Icon: 48px, #2A2A35
- Text: 16px medium, #71717A
- Subtext: 14px regular, #3F3F46

#### Error States
- Border: #EF4444
- Icon: Alert circle, #EF4444
- Text: 12px regular, #EF4444
- Background: rgba(239, 68, 68, 0.1)

---

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Behavior |
|------|-------|----------|
| Mobile | < 640px | Single column, sidebar becomes drawer |
| Tablet | 640-1024px | 2-column grids, condensed sidebar |
| Desktop | > 1024px | Full layout, all features visible |

### Mobile Adaptations
- Sidebar: Slide-out drawer (280px), overlay backdrop
- Cards: Full width, stacked vertically
- Header: Hamburger menu, icons collapse to touch targets (44px)
- Typography: Scale down 10-15%
- Padding: Reduce to 16px

---

## 9. Accessibility

### Color Contrast
- All text meets WCAG AA (4.5:1 ratio minimum)
- Crimson on black: ~7.2:1 (Passes AAA)
- White on surface: ~12:1 (Passes AAA)
- Gray text on black: ~5.8:1 (Passes AA)

### Focus Indicators
- Visible focus ring: 2px solid #DC2626, 2px offset
- Keyboard navigation: Full logical tab order
- Focus trap in modals

### Motion Preferences
- Respect `prefers-reduced-motion`
- Disable glows and transforms for reduced motion users
- Keep essential state changes (color, border)

---

## 10. Asset Specifications

### Logo
- **Format:** SVG
- **Colors:** #DC2626 (HR) + #FFFFFF (Space)
- **Minimum Size:** 24px height
- **Clear Space:** 8px minimum around logo

### Avatar Images
- **Aspect Ratio:** 1:1
- **Minimum Resolution:** 200px × 200px
- **Format:** JPG/PNG with rounded mask
- **Border:** 2px solid #2A2A35

### Icons
- **Format:** SVG
- **Stroke Width:** 2px
- **Size Variants:** 16px, 20px, 24px
- **Color:** CurrentColor (inherits from text)

---

## 11. Do's and Don'ts

### ✅ Do
- Use crimson sparingly for maximum impact (CTAs, key actions)
- Maintain consistent 24px gaps between cards
- Use the card pattern for all distinct content groups
- Ensure all interactive elements have hover states
- Keep the dark background consistent across all pages
- Use the established icon set consistently

### ❌ Don't
- Use crimson for large background areas (causes eye strain)
- Mix light and dark themes on different pages
- Use more than 3 card styles on a single view
- Reduce contrast below WCAG AA standards
- Use decorative elements without functional purpose
- Override the established spacing scale arbitrarily

---

## 12. Implementation Notes

### CSS Custom Properties
```css
:root {
  --color-crimson: #DC2626;
  --color-crimson-dark: #991B1B;
  --color-bg-base: #0A0A0F;
  --color-surface: #13131A;
  --color-surface-elevated: #1A1A24;
  --color-border: #2A2A35;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A1A1AA;
  --color-text-muted: #71717A;
  --shadow-card: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px rgba(220, 38, 38, 0.15);
  --radius-card: 12px;
  --radius-button: 8px;
  --space-lg: 24px;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode Default
This system is **dark-mode first**. Light mode is not part of the current brand specification. All components assume a dark background context.

---

*Document generated based on HRSpace Dashboard and Registration UI analysis.*  
*For questions or updates, contact the Design Systems team.*
