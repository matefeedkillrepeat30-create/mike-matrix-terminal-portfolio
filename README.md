# Mike — Matrix Terminal Portfolio

A responsive, Matrix-inspired terminal portfolio built with React, TypeScript, Vite, and Lucide icons. The interaction concept is inspired by [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio); this is an independently implemented personalized project, not a fork or a copy of its source files.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/` and can be deployed to Netlify, Vercel, GitHub Pages (with base-path configuration if hosted in a subdirectory), or any static web host.

## Terminal commands

`help`, `about`, `whoami`, `skills`, `experience`, `projects`, `certifications`, `contact`, `date`, `clear`.

- `Tab`: autocomplete
- `↑` / `↓`: previous / next command
- `Ctrl + L`: clear terminal

## Personalize before publishing

1. In `src/App.tsx`, replace the contact placeholders in the `contact` command with your real email, LinkedIn, and GitHub URLs.
2. Verify employer names, job dates, certification status, and TOEIC score before publishing. The current profile uses only details previously shared and deliberately avoids inventing employer names or dates.
3. Update the project descriptions and metrics if you want to disclose more detail publicly.

## Current profile content

- Senior IT Infrastructure & Network Security Engineer, 15+ years
- Cisco routing, switching, wireless, Cisco ISE / NAC / 802.1X
- FortiGate, Check Point, Forescout, SolarWinds
- PowerShell, Python, Node.js, Playwright, AutoHotkey, Power Automate
- Network link cost reduction: approximately THB 162,000 annual recurring savings
- Network automation and Japanese live-transcription prototype

## Notes

The original reference repository describes a React + TypeScript terminal portfolio and is MIT-licensed. This project references its interaction idea and repository URL for attribution; its implementation and styling here were authored independently. No original repository source files are included.
