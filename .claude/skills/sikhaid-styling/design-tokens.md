# SikhAid Design Tokens Reference

## Complete Color Palette

### Brand Colors
```css
/* Primary Navy */
--navy: #1a237e
--navy-dark: #0d1660

/* Accent Orange */
--orange: #FFA617
--orange-dark: #e89500
```

### Tailwind Gray Scale
```
gray-50:  #f9fafb
gray-100: #f3f4f6
gray-200: #e5e7eb
gray-300: #d1d5db
gray-400: #9ca3af
gray-500: #6b7280
gray-600: #4b5563
gray-700: #374151
gray-800: #1f2937
gray-900: #111827
```

### Semantic Color Usage

| Element | Color | CSS Class |
|---------|-------|-----------|
| Primary headings | Navy | `text-navy-custom` |
| Body text | Gray-700 | `text-gray-700` |
| Subtle text | Gray-600 | `text-gray-600` |
| Disabled text | Gray-400 | `text-gray-400` |
| Primary CTA | Orange | `bg-orange-custom` |
| Links | Orange | `text-orange-custom hover:text-orange-dark` |
| Navigation bg | Navy | `bg-navy` |
| Success | Green-500 | `text-green-500` |
| Error | Red-500 | `text-red-500` |
| Warning | Yellow-500 | `text-yellow-500` |

## Typography Scale

### Font Sizes (rem/px)
```
text-xs:    0.75rem  / 12px
text-sm:    0.875rem / 14px
text-base:  1rem     / 16px   ← Body text default
text-lg:    1.125rem / 18px
text-xl:    1.25rem  / 20px
text-2xl:   1.5rem   / 24px
text-3xl:   1.875rem / 30px
text-4xl:   2.25rem  / 36px
text-5xl:   3rem     / 48px
text-6xl:   3.75rem  / 60px
text-7xl:   4.5rem   / 72px
text-8xl:   6rem     / 96px
text-9xl:   8rem     / 128px
```

### Font Weights
```
font-thin:       100
font-extralight: 200
font-light:      300
font-normal:     400  ← Body text default
font-medium:     500
font-semibold:   600  ← Common for buttons
font-bold:       700  ← Common for headings
font-extrabold:  800
font-black:      900
```

### Line Heights
```
leading-none:     1
leading-tight:    1.25
leading-snug:     1.375
leading-normal:   1.5    ← Default
leading-relaxed:  1.625
leading-loose:    2
```

### Letter Spacing
```
tracking-tighter: -0.05em
tracking-tight:   -0.025em
tracking-normal:  0       ← Default
tracking-wide:    0.025em
tracking-wider:   0.05em
tracking-widest:  0.1em
```

## Spacing Scale

### Padding/Margin Values (rem/px)
```
0:    0
0.5:  0.125rem / 2px
1:    0.25rem  / 4px
1.5:  0.375rem / 6px
2:    0.5rem   / 8px
2.5:  0.625rem / 10px
3:    0.75rem  / 12px
3.5:  0.875rem / 14px
4:    1rem     / 16px   ← Very common
5:    1.25rem  / 20px
6:    1.5rem   / 24px   ← Common
8:    2rem     / 32px   ← Common
10:   2.5rem   / 40px
12:   3rem     / 48px
16:   4rem     / 64px   ← Common for sections
20:   5rem     / 80px
24:   6rem     / 96px   ← Common for sections
32:   8rem     / 128px
40:   10rem    / 160px
48:   12rem    / 192px
56:   14rem    / 224px
64:   16rem    / 256px
```

### Common Spacing Patterns

| Use Case | Mobile | Tablet (md) | Desktop (lg) |
|----------|--------|-------------|--------------|
| Container padding | `px-4` | `px-8` | `px-16` |
| Section vertical | `py-8` | `py-16` | `py-24` |
| Card padding | `p-4` | `p-6` | `p-6` |
| Button padding | `px-4 py-2` | `px-6 py-3` | `px-6 py-3` |
| Grid gap | `gap-4` | `gap-6` | `gap-8` |
| Element margin | `mb-4` | `mb-6` | `mb-8` |

## Border Radius

### Border Radius Values
```
rounded-none:  0
rounded-sm:    0.125rem / 2px
rounded:       0.25rem  / 4px
rounded-md:    0.375rem / 6px
rounded-lg:    0.5rem   / 8px    ← Most common
rounded-xl:    0.75rem  / 12px
rounded-2xl:   1rem     / 16px
rounded-3xl:   1.5rem   / 24px
rounded-full:  9999px            ← For circles
```

### Usage by Element

| Element | Border Radius |
|---------|---------------|
| Buttons | `rounded-lg` |
| Cards | `rounded-lg` or `rounded-xl` |
| Inputs | `rounded-lg` |
| Modals | `rounded-xl` |
| Images | `rounded-lg` |
| Avatars | `rounded-full` |
| Badges | `rounded-full` |

## Shadows

### Shadow Definitions
```css
shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:      0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
shadow-md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
shadow-lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)  ← Common
shadow-xl:   0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
shadow-2xl:  0 25px 50px -12px rgb(0 0 0 / 0.25)
shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
shadow-none:  0 0 #0000
```

### Shadow Usage

| Element | Default | Hover |
|---------|---------|-------|
| Cards | `shadow-lg` | `shadow-xl` or `shadow-2xl` |
| Buttons | `shadow-md` | `shadow-lg` |
| Modals | `shadow-2xl` | - |
| Dropdowns | `shadow-xl` | - |
| Images | `shadow-md` | `shadow-lg` |

## Z-Index Layers

```
z-0:   0
z-10:  10   ← Content over backgrounds
z-20:  20   ← Dropdowns
z-30:  30   ← Sticky headers
z-40:  40   ← Modals backdrop
z-50:  50   ← Modal content
```

### Common Z-Index Usage

| Element | Z-Index |
|---------|---------|
| Background overlay | `z-0` |
| Content layer | `z-10` |
| Dropdown menus | `z-20` |
| Sticky navigation | `z-30` |
| Modal backdrop | `z-40` |
| Modal content | `z-50` |

## Animation Timing

### Duration
```
duration-75:   75ms
duration-100:  100ms
duration-150:  150ms
duration-200:  200ms
duration-300:  300ms  ← Most common
duration-500:  500ms
duration-700:  700ms
duration-1000: 1000ms
```

### Timing Functions
```
ease-linear:    linear
ease-in:        cubic-bezier(0.4, 0, 1, 1)
ease-out:       cubic-bezier(0, 0, 0.2, 1)      ← Most common
ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1)
```

### Custom Animations

```css
/* Fade In - 0.6s ease-out */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up - 0.6s ease-out */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bounce In - 0.8s ease-out */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Animation Delays
```
delay-200:  0.2s
delay-400:  0.4s
delay-600:  0.6s
delay-800:  0.8s
delay-1000: 1s
```

## Breakpoints

### Responsive Breakpoints
```
sm:   640px   min-width: 640px   (Mobile landscape)
md:   768px   min-width: 768px   (Tablets)
lg:   1024px  min-width: 1024px  (Laptops)
xl:   1280px  min-width: 1280px  (Desktops)
2xl:  1536px  min-width: 1536px  (Large desktops)
```

### Responsive Typography Pattern
```
Mobile (base):    text-3xl
Tablet (md:):     text-5xl
Desktop (lg:):    text-7xl
```

### Responsive Spacing Pattern
```
Mobile (base):    py-8  px-4
Tablet (md:):     py-16 px-8
Desktop (lg:):    py-24 px-16
```

## Opacity

### Opacity Values
```
opacity-0:    0
opacity-5:    0.05
opacity-10:   0.1
opacity-20:   0.2
opacity-25:   0.25
opacity-30:   0.3
opacity-40:   0.4
opacity-50:   0.5   ← Common for overlays
opacity-60:   0.6
opacity-70:   0.7
opacity-75:   0.75
opacity-80:   0.8
opacity-90:   0.9
opacity-95:   0.95
opacity-100:  1
```

### Background Opacity Pattern
```svelte
<!-- Dark overlay on hero images -->
<div class="absolute inset-0 bg-black bg-opacity-50"></div>

<!-- Light overlay -->
<div class="absolute inset-0 bg-white bg-opacity-90"></div>
```

## Component-Specific Tokens

### Button Tokens
```
Padding:          px-6 py-3
Border Radius:    rounded-lg
Font Weight:      font-semibold
Shadow:           shadow-md
Hover Shadow:     shadow-lg
Transition:       transition-all duration-300
```

### Card Tokens
```
Background:       bg-white
Border Radius:    rounded-lg or rounded-xl
Shadow:           shadow-lg
Hover Shadow:     shadow-xl or shadow-2xl
Padding:          p-6
Transition:       transition-all duration-300
Hover Transform:  hover:-translate-y-2
```

### Input Tokens
```
Padding:          px-4 py-3
Border:           border border-gray-300
Border Radius:    rounded-lg
Focus Ring:       focus:ring-2 focus:ring-orange-custom
Focus Border:     focus:border-transparent
Outline:          focus:outline-none
```

### Modal Tokens
```
Backdrop:         bg-black bg-opacity-50
Content BG:       bg-white
Border Radius:    rounded-xl
Shadow:           shadow-2xl
Padding:          p-8
Z-Index:          z-50
```

## Paper Texture Values

```css
Background Color:     #f5f5f0
Grid Lines:          rgba(0,0,0,.02) at 2-3px intervals
Radial Gradient:     rgba(255,165,0,.05) at 10% 20%
Blend Mode:          multiply
```

## Quick Copy-Paste Classes

### Primary Button
```
bg-orange-custom hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg
```

### Secondary Button
```
bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300
```

### Card
```
bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl
```

### Input
```
w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all
```

### Section Container
```
container mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16 lg:py-24
```

### Grid (3 columns)
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8
```
