# Jiacheng Liu's Academic Homepage

Live site: https://tammytcl.github.io/Liu_Homepage/

A static, bilingual homepage organized around a short doctoral introduction,
scrollable news, research interests, internships, research overviews with links to representative work,
selected research projects, and a complete publication list grouped by year,
including selected work and research in progress.

## Update the content

- `data/publications.json`: paper titles, authors, venues, links, and bilingual project descriptions. This is also the source of truth for publication metadata in the downloadable CV.
- `data/news.json`: accepted-paper news only, automatically displayed newest first. `date` is the acceptance-news month (`YYYY-MM`), based on official conference notification dates or the journal's accepted-papers listing; `dateSource` records the source used, and `dateBasis` can clarify the track or journal convention. `publicationYear` is separate from the notification year (for example, AAAI 2026 decisions were announced in November 2025). `conference` entries derive counts and complete paper lists from that publication year and exact venue (including Oral, excluding separate workshops). An optional `highlight` and bilingual `focus` describe the owner's main project. `accepted` entries reference individual publication IDs. News omits authorship-role labels; the publication list retains the full metadata.
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
