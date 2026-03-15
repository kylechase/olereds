---
name: dev
description: Build and serve the site locally for testing, then open it in the browser.
allowed-tools: Bash(npm run build:*), Bash(npm run preview:*), Bash(npx astro:*), Bash(kill:*), Bash(lsof:*)
---

Test the site locally by building and previewing it:

1. Run `npm run build` to produce a production build in `./dist/`.
2. If the build fails, diagnose and fix the errors, then rebuild.
3. Start the preview server with `npm run preview` in the background.
4. Tell the user the local URL (default: http://localhost:4321/olereds/) so they can verify the site.
5. If the user reports issues or asks you to stop, kill the preview server process.
