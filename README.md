# Xbox Gaming Website — School Project

An immersive, single-page Xbox fan website built with pure HTML, CSS, and JavaScript.  
Inspired by [Porter Robinson's website](https://porterrobinson.com) aesthetic combined with [Xbox.com](https://www.xbox.com) design language.

## Live Demo

> Enable GitHub Pages: **Settings → Pages → Source: main / (root)** to host it live.

## Features

- **Particle system** — 110 floating particles with connection lines drawn on canvas
- **Glitch typography** — periodic RGB-split animation on the hero heading
- **Aurora background** — animated radial gradient layers that slowly breathe
- **Custom cursor** — smooth lag-follow cursor with grow-on-hover
- **Scroll reveal** — staggered entry animations via IntersectionObserver
- **3D card tilt** — parallax tilt effect on game cards based on mouse position
- **Filter tabs** — filter games by genre (Action, RPG, Racing, Sandbox)
- **Counter animation** — numbers count up when the stats section enters view
- **Game Pass pricing** — PC vs Ultimate side-by-side comparison
- **CSS console shapes** — Xbox Series X and Series S rendered in pure CSS
- **Fully responsive** — works on desktop, tablet, and mobile

## Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Markup     | HTML5 (semantic)                   |
| Styling    | CSS3 (custom properties, grid, keyframes) |
| Scripting  | Vanilla JavaScript (ES6+)          |
| Fonts      | Google Fonts — Barlow Condensed + Barlow |
| Hosting    | GitHub Pages (static)              |

## Getting Started

```bash
git clone https://github.com/Ifa89/Xbox-project.git
cd Xbox-project
# Open index.html in your browser — no build step needed
```

## Project Structure

```
xbox-project/
├── index.html   — Full page markup (nav, hero, games, game pass, consoles, footer)
├── styles.css   — All styles, animations, and responsive breakpoints
└── script.js    — Particle system, cursor, scroll reveal, counters, filter tabs
```

## License

[MIT](LICENSE) — free to use, modify, and distribute.
