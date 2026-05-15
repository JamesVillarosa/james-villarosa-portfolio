# James Carl V. Villarosa — Portfolio

Personal portfolio website built with React + Vite. Deployed on Render.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev

# 3. Build for production
npm run build
```

## Adding Your Profile Photo

1. Place your photo file in `/public/` — name it `profile.jpg`
2. That's it. The Hero component will automatically display it.

If no photo is found, a placeholder is shown automatically.

## Customizing Content

All content is in one file: `src/data/portfolioData.js`

Edit that file to update:
- Personal info, email, phone, social links
- About bio and stats
- Experience entries
- Projects (add/remove/edit)
- Skills per category

## Deploying to Render

1. Push this project to a GitHub repository
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Set these build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Click Deploy

Your portfolio will be live at `https://your-app-name.onrender.com`

## Tech Stack

- React 18
- Vite 5
- Vanilla CSS (no Tailwind — easier to customize)
- Google Fonts: Syne + Plus Jakarta Sans
- IntersectionObserver for scroll animations
- No external UI libraries (zero bundle bloat)
