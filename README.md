# Jiacheng Liu's Academic Homepage

Live site: https://tammytcl.github.io/Liu_Homepage/

A static, bilingual homepage organized around a short doctoral introduction,
research interests, internships, selected first-author / co-first-author projects,
and a complete publication list grouped by year, including selected work.

## Update the content

- `data/publications.json`: paper titles, authors, venues, links, and bilingual project descriptions.
- `scripts/build.mjs`: introduction, research directions, internships, and selected project ordering.
- `static/css/academic.css`: responsive page layout and typography.
- `static/img/profile.png`: profile portrait supplied by the owner.
- `assets/resume.pdf`: current public resume, opened by the View CV button.

After editing the source content, regenerate both language pages:

```sh
node scripts/build.mjs
```

The generated `index.html` and `index_en.html` contain all text and links.
Stylesheet, portrait, and resume URLs include content versions to avoid stale browser caches.
JavaScript is not required to read either page or expand publication groups.

## Preview

Serve this directory with any static server, for example:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/` and `http://127.0.0.1:8765/index_en.html`.

## GitHub Pages

Keep the repository's existing Pages configuration. Commit the regenerated HTML
together with the source files and stylesheet, then push to the configured source
branch. No npm dependencies or server-side build are required.

Existing paper PDFs, figures, and their URLs are retained under `assets/`.
