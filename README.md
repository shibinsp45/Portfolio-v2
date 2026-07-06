<div align="center">
  <h1 align="center">Shibin S P — Personal Portfolio v2</h1>

  <p align="center">
    A state-of-the-art, hyper-responsive developer & designer portfolio featuring full-screen case study modals, deep-linking routing, GSAP scroll animations, and a signature liquid glass aesthetic.
    <br />
    <a href="https://github.com/shibinsp45/Portfolio-v2"><strong>Explore repository »</strong></a>
    <br />
    <br />
    <a href="https://github.com/shibinsp45/Portfolio-v2">View Code</a>
    ·
    <a href="https://github.com/shibinsp45/Portfolio-v2/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/shibinsp45/Portfolio-v2/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
</div>

---

## 📖 Overview

**Portfolio v2** is a high-performance, framework-free developer portfolio designed to deliver an unforgettable first impression. Built with pure HTML5, modern CSS3 (custom design tokens, glassmorphism, flexbox/grid), GSAP 3 animations, and Vanilla JavaScript.

The design features a custom **Liquid Glass UI**, interactive project case studies, responsive adaptive navigation, and robust dark/light theme switching.

---

## ✨ Key Features & Highlights

### 🚀 Interactive Full-Screen Case Study Modals
- **Full-Screen Immersive Modals**: Clicking any project card or toggle opens a dedicated, full-screen case study window (`100vw` × `100vh`) with high-resolution imagery, impact metrics (e.g., `4.9 ★ Rating`, `250k+ Downloads`), project overviews, UX features, and tech stack tags.
- **Deep-Linking Hash Router**: Supports direct URL sharing for case studies (e.g., `/#project-billzy`, `/#project-tools`, `/#project-nexhome`, `/#project-vault`). Page load and `hashchange` events automatically mount the requested project modal.
- **Center Hover Reveal**: Hovering over project cards applies a soft background image scale (`1.05x`) and backdrop blur (`blur(8px)`), revealing a centered dark-glass **"Peek inside ↗"** toggle button.

### 🎨 Adaptive Navigation & Liquid Glass Architecture
- **Desktop Nav (`> 1024px`)**:
  - Centered links (`Projects`, `About`, `Process`, `Services`) with a top-right floating theme toggle and `Connect` action button.
  - **Scroll Collapse Animation**: On scroll down, the nav chip automatically collapses into a sleek pill showing `Logo` + `Connect` + `3 Dancing Dots` (`juggleDots` animation). Hovering over the collapsed chip expands the nav links smoothly.
- **Tablet & Mobile Nav (`≤ 1024px`)**:
  - Renders as a clean floating chip displaying `Logo` + `3-Line Hamburger Icon`.
  - Clicking the hamburger opens a full-screen overlay menu with background scroll locking.
- **Liquid Glassmorphism**:
  - Light mode: Transparent glass (`rgba(255, 255, 255, 0.45)`) with a dark signature logo (`filter: brightness(0)`).
  - Dark mode: Dark glass (`rgba(18, 18, 18, 0.72)`) with a white signature logo (`filter: brightness(0) invert(1)`).

### ⚡ GSAP ScrollTrigger Animations
- Entrance animations for hero typography, project cards, experience timeline, expertise grids, and footer CTAs.
- Web Audio API notification ding sound on scroll-triggered floating CTA pill.

---

## 🛠 Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (Custom Tokens, Glassmorphism, CSS Grid & Flexbox)
- **Animation**: [GSAP 3](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Inter` & `La Belle Aurore`)

---

## 💻 Projects Showcase

| Project | Category | Key Tech Stack | Hash Link |
| :--- | :--- | :--- | :--- |
| **Billzy** | Mobile Product Design | Figma, React Native, GSAP, Node.js | `/#project-billzy` |
| **Tools** | On-Demand Service App | Flutter, Mapbox API, Firebase | `/#project-tools` |
| **NexHome** | Smart Living Dashboard | Next.js, TailwindCSS, MQTT, WebSockets | `/#project-nexhome` |
| **Vault** | Personal Finance & Wealth | SwiftUI, D3.js, Plaid API, Node.js | `/#project-vault` |

---

## 🚀 Local Setup & Running

No complex build steps, `npm install`, or bundlers are needed!

1. **Clone Repository**:
   ```bash
   git clone https://github.com/shibinsp45/Portfolio-v2.git
   cd Portfolio-v2
   ```

2. **Run Local Server**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   ```

3. **View in Browser**:
   Navigate to `http://localhost:8000`

---

## 📄 License & Attribution

Designed & Developed by **Shibin S P** © 2026. All rights reserved.
