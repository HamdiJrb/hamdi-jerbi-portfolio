# Hamdi Jerbi - Creative Portfolio Website

A modern, high-performance, production-ready portfolio website for **Hamdi Jerbi**, Software Engineer & UI/UX Specialist. Built with **React 18**, **Tailwind CSS**, and **Vite**, featuring a Soft Blue + Pastel design aesthetic, dark/light mode system detection, 8 interactive project case studies with modal image carousels, and Formspree contact integration.

![Hamdi Jerbi Portfolio Preview](https://raw.githubusercontent.com/hamdi-jerbi/hamdi-jerbi.github.io/main/public/preview.png)

---

## ✨ Features

- **Soft Blue + Pastel Creative Aesthetic**:
  - Primary: `#6366F1` (Indigo)
  - Secondary: `#0EA5E9` (Sky Blue)
  - Accent 1: `#A78BFA` (Purple)
  - Accent 2: `#F472B6` (Pink)
  - Dark Mode: `#0F172A` (Deep Slate Navy) & Light Mode: `#F8FAFC`
- **Dark Mode / Light Mode**:
  - Global `ThemeContext` with smooth CSS transition
  - Auto-detects OS `prefers-color-scheme`
  - Persists preference in `localStorage`
- **Interactive Project Case Studies (8 Total)**:
  - Dubai ComCity Event Activations
  - E-Commerce Platform Redesign
  - Mobile Banking App (UI/UX System)
  - SaaS Dashboard (Data Visualization)
  - Social Media Management Platform
  - Fitness Tracking Mobile App
  - Travel Itinerary Planner
  - Project Management Collaboration Tool
- **Full Project Modal & Image Carousel**:
  - Multi-image gallery carousel
  - Mobile touch swipe navigation & keyboard arrows (`←` / `→`)
  - ESC key to close modal with background scroll lock
  - Outbound links for Live Demo, GitHub, and Case Study
- **Formspree Contact Form**:
  - Client-side validation for Name, Email, Subject, and Message
  - Loading spinner and accessible state alerts
- **SEO & Performance**:
  - OpenGraph & Twitter Card tags
  - Google Fonts preconnect (`Inter` & `Poppins`)
  - `robots.txt` and `sitemap.xml` included

---

## 📁 Project Structure

```
hamdi_jerbi_portfolio/
├── public/
│   ├── favicon.svg          # Monogram vector favicon
│   ├── robots.txt           # Search engine directives
│   ├── sitemap.xml          # Site URL sitemap
│   └── images/
│       └── projects/        # Place your project screenshots here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky glass header with mobile hamburger drawer
│   │   ├── Hero.jsx         # Animated hero with glow orbs & quick CTAs
│   │   ├── About.jsx        # Professional summary & dual mindset showcase
│   │   ├── Skills.jsx       # Categorized skills (UX/UI, Tools, Frontend, Backend)
│   │   ├── Experience.jsx   # Interactive career timeline
│   │   ├── Projects.jsx     # Filterable project gallery
│   │   ├── ProjectCard.jsx  # Interactive card with micro-animations
│   │   ├── ProjectModal.jsx # Accessible modal dialog with carousel
│   │   ├── Contact.jsx      # Formspree form & direct contact channels
│   │   ├── Footer.jsx       # Quick navigation & copyright
│   │   └── ThemeToggle.jsx  # Animated Sun/Moon toggle
│   ├── context/
│   │   └── ThemeContext.jsx # Theme state provider
│   ├── data/
│   │   ├── portfolio.json   # Bio, stats, skills, and work history
│   │   └── projects.json    # Detailed specs for all 8 projects
│   ├── styles/
│   │   └── globals.css      # Tailwind directives & glassmorphic styles
│   ├── App.jsx              # Main page coordinator
│   └── index.jsx            # React root mount
├── index.html               # Entry HTML with meta tags
├── package.json             # Scripts & dependencies
├── vite.config.js           # Vite build configuration
├── tailwind.config.js       # Custom palette & typography configuration
├── postcss.config.js        # PostCSS configuration
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have **Node.js** (v18 or higher recommended) and **npm** installed on your system.

### Installation

1. Clone or extract the project folder:
   ```bash
   cd d:\Portfolio\hamdi_jerbi_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 🖼️ Adding Project Images

Project images are referenced in `src/data/projects.json`.
Drop your screenshot images into `public/images/projects/` matching the file names:

- `dubai_comcity_race_the_city_thumbnail.png`
- `dubai_comcity_race_the_city_screen1.png`
- `dubai_comcity_race_the_city_screen2.png`
- `dubai_comcity_race_the_city_screen3.png`
- `dubai_comcity_race_the_city_screen4.png`
- `ecommerce_platform_thumbnail.png`
- `ecommerce_platform_screen1.png` ...
- (etc. for each project)

> **Note:** Even if images are not yet added, the application features an automatic aesthetic gradient fallback banner and placeholder system so nothing breaks!

---

## 📬 Configuring the Contact Form (Formspree)

The contact form is configured in `src/components/Contact.jsx`.

1. Go to [https://formspree.io/](https://formspree.io/) and create a free account.
2. Create a new form and copy your form ID (e.g. `xvgzgeyw`).
3. Open `src/components/Contact.jsx` and replace:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
4. Submissions will now be emailed directly to your inbox (`h.jerbi78@gmail.com`).

---

## 🚢 Production Deployment

### GitHub Pages

The repository includes a GitHub Actions workflow that builds the Vite app and deploys
`dist/` to GitHub Pages whenever a commit is pushed to `main`.

1. Push this project to the `main` branch of the `hamdi-jerbi-portfolio` GitHub repository.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the **Actions** tab and wait for the **Deploy to GitHub Pages** workflow to complete.
4. The portfolio will be available at `https://<your-github-username>.github.io/hamdi-jerbi-portfolio/`.

The custom Vite base path is enabled in GitHub Actions builds, so images and other public
assets work from the repository subpath. Local development continues to use the root path.

### Custom domain

After `hamdijerbi.me` is registered and active, add it under **Settings → Pages → Custom domain**
and configure the DNS records Namecheap/GitHub request. Wait for DNS to propagate, then enable
**Enforce HTTPS** in GitHub Pages settings.

---

## 📄 License

Designed and developed by **Hamdi Jerbi**. All rights reserved.
