# Pranav Jindal Portfolio

Personal portfolio website for Pranav Jindal, built to present work across software engineering, machine learning, data systems, and telecom research in a polished, recruiter-friendly format.

## Overview

This project is a single-page React portfolio with dedicated sections for:

- hero and current focus
- about and skills
- resume and education
- selected projects
- contact and direct outreach

The site is designed to feel clean, fast, and intentional across mobile, laptop, and large desktop screens.

## What’s Included

- Responsive portfolio experience built with React and Vite
- Light and dark theme support
- Loader and smooth section-based navigation
- Data-driven content for skills, experience, education, certifications, and projects
- Contact form with backend handling through Resend
- Local bundled fonts and Iconify assets for more reliable rendering without runtime font/icon fetches

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- Lucide React
- Iconify
- Resend for contact email delivery

## Project Structure

```text
src/
  components/     Shared UI pieces such as navbar, loader, section heading, sidebar
  data/           Portfolio content and vendored Iconify collections
  lib/            Small utilities such as offline Iconify setup
  sections/       Main page sections: Home, About, Resume, Projects, Contact

public/
  fonts/          Local font files and stylesheet
  Pranav_Jindal_Resume.pdf

api/
  contact.js      Serverless-style contact endpoint entry

server/
  contact-handler.cjs
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Create a local `.env` file using `.env.example` as a reference.

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL="Pranav Portfolio <portfolio@yourdomain.com>"
CONTACT_TO_EMAIL=jindalpranav944@gmail.com
```

### Notes

- `RESEND_API_KEY` is required for the contact form to send emails.
- `CONTACT_FROM_EMAIL` should be a verified sender in Resend.
- `CONTACT_TO_EMAIL` can be changed if submissions should go somewhere else.

## Contact Form

The contact form submits to `/api/contact`.

In development and preview, Vite middleware wires that route through `server/contact-handler.cjs`.

For deployments that support serverless functions, `api/contact.js` provides the entry point while reusing the same handler logic.

## Content Updates

Most portfolio content is managed from:

```text
src/data/portfolio.js
```

That includes:

- personal profile details
- hero text and stats
- tech stack categories and skills
- experience entries
- education
- certifications
- project cards

This keeps the site easy to update without rewriting section components.

## Local Asset Strategy

Fonts and skill icons are stored locally in the repo so the UI does not depend on runtime requests to Google Fonts or remote icon collections.

Relevant files:

- `public/fonts/google-fonts.css`
- `public/fonts/*.woff2`
- `src/data/iconify/*.json`
- `src/lib/iconify.jsx`

If the external font or icon sets ever need to be refreshed, use:

```bash
node scripts/vendor-web-assets.mjs
```

## Deployment Notes

This project works well for static hosting plus a serverless contact endpoint.

Before deploying:

- make sure the contact environment variables are configured
- ensure the sender email used in `CONTACT_FROM_EMAIL` is verified in Resend
- confirm the resume PDF in `public/` is the latest version

## Purpose

This portfolio is meant to showcase:

- engineering depth
- applied ML and systems work
- research-backed experience
- strong frontend presentation

The goal is not just to list experience, but to communicate clarity, range, and execution quality through both content and interface.
