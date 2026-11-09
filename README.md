# Nexavira IT — frontend

A lightweight, multi-page corporate website built with semantic HTML, CSS and vanilla JavaScript. No build step or backend is required.

## Project structure

```text
index.html
about.html
services.html
portfolio.html
contact.html
faq.html
careers.html
privacy.html
terms.html
404.html
services/
  website-development.html
  wordpress-development.html
  ecommerce-development.html
  web-applications.html
  django-python.html
  ui-ux-design.html
  website-maintenance.html
  digital-solutions.html
work/
  northline-studio.html
  kinfolk-market.html
  fieldnote.html
  common-ground.html
css/
  style.css
  responsive.css
  animations.css
js/
  main.js
```

Open `index.html` directly, or serve this folder with any static file server. Shared navigation and footer markup is intentionally kept straightforward so it can later be converted into Django template includes.

## Before publishing

- Replace all bracketed company contact details and business hours.
- Replace the clearly marked sample portfolio concepts and testimonials with approved, verified material. The `work/` pages are illustrative concepts, not completed client work.
- Replace the project-statistic placeholders with real figures or remove them.
- The provided `images/NexaviraIT.png` logo is used in shared page headers and footers.
- Connect the contact form to a Django endpoint when the backend is ready. The current form only validates fields in the browser and never sends data.
- Update social profile URLs from the generic platform links to the company’s official profiles.
- Have the draft privacy notice and website terms reviewed and completed against the company’s real practices and applicable law before publication.
- Add verified job details to the Careers page when openings are approved. Configure the web server or static host to serve `404.html` for missing pages.

The site uses Google Fonts when a network connection is available and falls back to system sans-serif fonts otherwise. No external JavaScript libraries are used.
