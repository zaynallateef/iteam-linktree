# iTeam

Arabic RTL static link page built with React, TypeScript, Vite, and Tailwind CSS. Includes the supplied Instagram and WhatsApp links, persistent light/dark themes, and original student guides with modal viewing, zoom, and downloads. The Arabic font is bundled locally.

## Run

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Deploy the generated `dist` folder to a static host. No backend or environment variables are required.

## Content

Links and guide metadata live in `src/main.tsx`; original images are in `public/images`. The supplied 2D JPEG identity is displayed by `src/BrandLogo.tsx`, preserving its original English wordmark and text. `src/GuideViewer.tsx` provides bounded 1?5? zoom, mouse wheel and pinch gestures, dragging, double-click zoom, reset, downloads, and keyboard controls (+, -, 0, arrows). Colors and layout rules live in `src/styles.css`.

Academic plans are organized in `src/AcademicPlans.tsx`, with asset paths in `src/plan-assets.json`. All nine original files are preserved in `public/plans`. PDF pages have 2600px WebP previews, loaded one page at a time; downloads retain the original PDFs/JPEG. The four IT majors have study/tree pairs. Mathematics has only a supplied study plan. Cybersecurity has differing year labels in the supplied study and tree files, shown explicitly in the UI. Bilingual support remains pending discussion.

The 99-page 2025?2026 university student guide appears before the majors (`src/StudentGuide.tsx`). Its original PDF and on-demand page previews are in `public/plans`. English labels use the system Segoe UI / Helvetica Neue font stack. Light/dark semantic color tokens preserve the four brand accents and use contrasting supporting neutrals.
