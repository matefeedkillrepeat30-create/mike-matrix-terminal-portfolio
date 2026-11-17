import { useRef } from "react";
import "./MatrixPortrait.css";

export default function MatrixPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = (0.5 - py) * 10;
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  }

  function resetPointer() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  }

  return (
    <section className="matrix-portrait-stage" aria-label="Interactive Matrix portrait">
      <div className="matrix-orbit matrix-orbit-a" />
      <div className="matrix-orbit matrix-orbit-b" />
      <span className="matrix-tag matrix-tag-net">NET</span>
      <span className="matrix-tag matrix-tag-sec">SEC</span>
      <span className="matrix-tag matrix-tag-ops">OPS</span>
      <div
        ref={cardRef}
        className="matrix-portrait-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
      >
        <img src="/mike-matrix-hero.png" alt="Mike in a green Matrix-inspired digital portrait" />
        <div className="matrix-pointer-glow" />
        <div className="matrix-scanline" />
      </div>
    </section>
  );
}
