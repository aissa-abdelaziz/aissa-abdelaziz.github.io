# Aissa Abdelaziz — Portfolio

A single-page portfolio built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## File structure

```
portfolio/
├── index.html          all homepage content and structure
├── blog/
│   ├── index.html       blog listing page (links to each post below)
│   ├── agent-memory.html          post 1
│   ├── finetuning-vs-rag.html     post 2
│   └── hpc-debugging.html         post 3
├── projects/
│   ├── index.html                    projects listing page (links to each project below)
│   ├── cardiocare.html                project 1
│   ├── gopro-video-interpolation.html project 2
│   └── document-table-extraction.html project 3
├── css/
│   └── styles.css      design tokens, theme (dark/light), layout, components
├── js/
│   └── main.js          theme toggle, mobile nav, scroll reveal, contact form
├── assets/
│   ├── images/          put your headshot photo here
│   └── cv/               put your CV PDF here
└── README.md
```

The homepage's Projects and Writing sections still show preview cards. Each "View project" / "Read more" link opens the matching page in `projects/` or `blog/`, and "View all projects" / "View all posts" open the respective `index.html` listing. Every page in `projects/` and `blog/` reuses the same header, footer, theme toggle, and stylesheet as the homepage — they're separate HTML files, not a template engine, so each one repeats the header/footer markup (normal for a plain-HTML site with no build step). While browsing a project or post page, the nav's "Projects"/"Blog" links go straight to the respective listing page rather than back to the homepage's preview section.

## Running it locally

Either:

- Open `index.html` directly in a browser, or
- Serve it with a simple local server (needed for the contact form's `fetch()` call to behave like it will in production):
  ```
  python -m http.server
  ```
  then visit `http://localhost:8000`.

No install step, no dependencies to build.

## Placeholders to replace

Every placeholder is marked in the code with a comment like `<!-- PLACEHOLDER-NAME: ... -->` — search `index.html` for `PLACEHOLDER` to find all of them. Checklist:

1. **Headshot photo** — in the About section, replace the `.avatar` initials div with:
   ```html
   <img class="avatar" src="assets/images/headshot.jpg" alt="Aissa Abdelaziz">
   ```
   and add your photo at `assets/images/headshot.jpg`.

2. **CV PDF** — add your real CV at `assets/cv/aissa-abdelaziz-cv.pdf` (the "Download CV" button in the hero already points there). If you name the file differently, update the `href` in the hero's CTA group.

3. **GitHub / LinkedIn URLs** — three places each (hero social icons, contact section list, footer icons) currently use `href="#"`. Replace with your real profile URLs.

4. **Project pages** — the three real projects (CardioCare+, GoPro video interpolation, Assystem table extraction) each have a real page under `projects/` (e.g. `projects/cardiocare.html`). For each one: replace the placeholder paragraph inside `.post__body` (marked `PLACEHOLDER-PROJECT-BODY`) with the full case study, and update the "View repository" button's `href` (marked `PLACEHOLDER-PROJECT-LINK-1/2/3`) with a real repo, demo, or write-up URL — or delete that button if you don't have one to link. To add a new project: copy an existing file in `projects/`, edit its content, then link it from the preview grids in `index.html` and `projects/index.html`.

5. **Extra project cards** — two placeholder cards at the end of the Projects grid (title "Project title") in both `index.html` and `projects/index.html` are ready for you to fill in with real content (add a matching detail page in `projects/` if you want one), or delete the `<article>` if you don't need them.

6. **Blog posts** — three placeholder posts, each a real page under `blog/` (e.g. `blog/agent-memory.html`) with "Coming soon" as the date. For each one: update the `<title>`/meta description, the date, and replace the placeholder paragraph inside `.post__body` (marked `PLACEHOLDER-BLOG-POST-BODY`) with your actual article — headings (`<h2>`), paragraphs (`class="post__text"`), and lists all pick up the site's styling automatically. Also update the matching preview card (title/date/excerpt) in both `index.html` and `blog/index.html`. To add a new post: copy an existing file in `blog/`, edit its content, then link it from the preview grids in `index.html` and `blog/index.html`. To remove a post, delete its file and its two preview cards.

7. **Contact form backend** — the form currently posts to `https://formspree.io/f/PLACEHOLDER_FORM_ID`. Sign up at [formspree.io](https://formspree.io), create a form, and replace `PLACEHOLDER_FORM_ID` with your real form ID (in the `action` attribute of `<form id="contact-form">` in `index.html`).

## Customizing the design

- Colors, fonts, spacing, and the fluid type scale are all defined as CSS custom properties at the top of `css/styles.css` — change a value there and it updates everywhere.
- Dark/light theme values live in the `[data-theme="dark"]` and `[data-theme="light"]` blocks in the same file.
- The site defaults to the visitor's OS theme preference on first visit, then remembers their choice in `localStorage` once they use the toggle in the header.

## Notes

- Nav active-section highlighting (scroll-spy) is intentionally not implemented, to keep the single-page nav simple — a deliberate scope choice, not an oversight.
- All animations (hero graphic, scroll reveals, hover states) respect `prefers-reduced-motion`.
