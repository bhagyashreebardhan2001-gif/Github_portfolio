# Bhagyashree Bardhan — GitHub Portfolio

This is the GitHub Pages-ready version of the existing Bhagyashree Bardhan portfolio, updated so the **Projects** section contains only these four GitHub projects:

1. HYD LULC
2. Magarpatta Satellite Explore
3. Geospatial Big Data
4. Earthquakes World

The rest of the portfolio structure is retained: Hero, About, Certificates & Achievements, Contact, Lenis smooth scrolling, GSAP/ScrollTrigger, responsive layout, custom cursor and the existing project interaction system.

## Upload to GitHub Pages

Upload **everything inside this folder** to the root of your portfolio repository. The important file is:

```text
index.html
```

Do not put `index.html` inside another nested folder unless your GitHub Pages setup is configured for that path.

Then enable:

**GitHub → Repository → Settings → Pages → Deploy from a branch → main → / (root)**

## File structure

```text
index.html
projectsData.js
README.md
css/
  style.css
js/
  main.js
  certificatesData.js
assets/
  hero/
    profile.jpg
  projects/
    hyd-lulc.png
    magarpatta-satellite-explore.png
    geospatial-big-data.svg
    earthquakes-world.svg
  about/
  certificates/
```

## Project data

All four projects are controlled from:

```text
projectsData.js
```

Each project contains its title, category, year, location, description, tools, features, image and external links.

The project links are:

- HYD LULC — https://bhagyashreebardhan2001-gif.github.io/HYD_LULC/
- Magarpatta Satellite Explore — https://bhagyashreebardhan2001-gif.github.io/magarpatta-satellite-explore/
- Geospatial Big Data — https://bhagyashreebardhan2001-gif.github.io/Geospatial_bigdata/
- Earthquakes World — https://bhagyashreebardhan2001-gif.github.io/earthquakes_world/

Each project also contains its corresponding GitHub repository URL.

## Adding or editing a project

Edit only `projectsData.js` and add another object to `window.portfolioProjects`.

Example:

```javascript
{
  id: 'my-project',
  title: 'My Project',
  category: 'WEBGIS',
  year: '2026',
  location: 'Pune, India',
  description: 'Short project description.',
  overview: 'Longer overview.',
  whatIDid: 'What I actually did.',
  tools: ['QGIS', 'Python'],
  features: ['Interactive map'],
  results: 'Actual output.',
  image: 'assets/projects/my-project.jpg',
  resources: {
    interactiveMap: 'https://example.com/',
    github: 'https://github.com/username/repository'
  }
}
```

Only include facts that are actually supported by the project.

## Certificates

`js/certificatesData.js` is intentionally empty right now. No certificates or awards were invented.

Add only real certificates when you have the images and details.

## Optional video assets

The existing design supports optional files such as:

```text
assets/hero/hero-video.mp4
assets/hero/hero-poster.jpg
assets/about/about-video.mp4
assets/about/about-poster.jpg
```

If these files are absent, the site still works.

## Static hosting

The portfolio uses normal HTML, CSS and JavaScript and is suitable for GitHub Pages. External libraries are loaded from CDNs for Lenis, GSAP, ScrollTrigger and Globe.gl.

No backend is required.

## Important note about external project pages

The portfolio links to the four existing GitHub Pages projects rather than copying their applications into this repository. The `Live Project` buttons open those projects in a new tab, while `GitHub Repository` opens the source repository.
