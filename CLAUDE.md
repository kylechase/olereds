# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/landing page for "Ole Reds Commercial Cleaning", a commercial cleaning service for offices and businesses. Built with Astro and Tailwind CSS v4, deployed to GitHub Pages.

## Commands

- `npm run dev` — local dev server (localhost:4321)
- `npm run build` — production build to `./dist/`
- `npm run preview` — preview production build locally

No tests or linter configured.

## Architecture

Single-page static site (Astro `output: 'static'`):

- `src/pages/index.astro` — the entire site: header, hero, services, pricing, contact form, footer. Contains an inline `<script>` that POSTs form submissions to a Google Apps Script endpoint.
- `src/layouts/Layout.astro` — HTML shell with meta tags; imports Tailwind.
- `src/styles/global.css` — just `@import "tailwindcss"` (Tailwind v4 style).
- `google-apps-script.js` — standalone Apps Script for form backend (logs to Google Sheets, sends email notification). Not part of the Astro build; deployed separately via script.google.com.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. The `base` path in `astro.config.mjs` must match the GitHub repo name (currently `/olereds`).

## Git Commit Conventions

Do not add Claude as a co-author or contributor in commit messages (no `Co-Authored-By: Claude` trailer, no mention of Claude/Anthropic). Commits should be attributed solely to the human author.
