# Bitcoin Buddy

![GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-blue?logo=github)
![Status](https://img.shields.io/badge/status-Offline%20Capable-success)
![IndexedDB](https://img.shields.io/badge/storage-IndexedDB-orange)
![No Framework](https://img.shields.io/badge/frameworks-none-lightgrey)

---

## About the Project

**Bitcoin Buddy** is a progressive web app developed as part of the **Mobile Systems** course. The main objective was to explore core concepts of mobile-friendly, offline-capable applications **without using any modern frontend frameworks**.

Key requirements included:

- Implementing at least **three distinct views**
- Integrating an **external API**
- Creating a **form with data persistence via IndexedDB**
- Adding **custom icons** and a configured `manifest.json` for PWA functionality

---

## Framework Restrictions
This project was built entirely with **vanilla HTML, CSS, and JavaScript** — **no frameworks** such as React, Angular, or Vue were used. This constraint was essential to demonstrate understanding of native web APIs and performance-conscious design.

---

## Hosting & Storage
- **Hosted on:** [GitHub Pages](https://radzioot.github.io/PWA_Task_4/)
- **Local storage:** Data is stored in **IndexedDB** to support offline usage.
---

## External API Integration
App uses [Sample APIs](https://sampleapis.com) to simulate real-time **Bitcoin value data**.

- In **online mode**, all views, including the analytics page, function as expected.
- In **offline mode**, the analytics view is replaced with an **error component** to gracefully handle the lack of data.

---

## Project Features
- 3 interactive views
- Offline support with graceful error handling
- External data fetching
- IndexedDB form data persistence
- Custom icons and PWA manifest

---

## Live Page

You can access the live version of Bitcoin Buddy here: [**View Live App**](https://radzioot.github.io/PWA_Task_4/)

---

## Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5 / CSS3
- IndexedDB
- Web APIs (Fetch, Service Worker, DOM)
- Chart.JS
- Bootstrap
- GitHub Pages for hosting

---

## Running locally

If you'd like to run the app locally:


#### Download repo:
```bash
git clone https://github.com/RadziooT/PWA_Task_4.git
cd bitcoin-buddy
```

#### Create local certificate using mkcert:
```bash
mkcert -install # Install local CA (Certificate Authority)
mkcert localhost # Generate SSL certificate for domain "localhost"
```

#### Run app using http server:
```bash
http-server -S -C localhost.pem -K localhost-key.pem -a localhost
```