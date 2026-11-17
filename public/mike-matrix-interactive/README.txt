MIKE MATRIX INTERACTIVE PORTRAIT

1) Copy public/mike-matrix-hero.png into your existing project's public/ folder.
2) Copy src/MatrixPortrait.tsx and src/MatrixPortrait.css into your existing src/ folder.
3) In App.tsx, import the component:
   import MatrixPortrait from './MatrixPortrait';
4) Replace the existing hero visual / terminal icon block with:
   <MatrixPortrait />
5) Commit and push to GitHub. Vercel should deploy automatically.

Mouse movement tilts the portrait card, moves a green light hotspot, and the orbit rings rotate.
The generated hero artwork is a single image layer; this component adds interactive CSS effects around it.
