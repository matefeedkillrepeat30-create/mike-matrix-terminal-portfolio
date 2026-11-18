import { useEffect, useRef } from "react";
import "./MatrixPortrait.css";

export default function MatrixPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated Japanese katakana + numbers Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    const fontSize = 15;
    const glyphs = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -height / fontSize);
      speeds = Array.from({ length: columns }, () => 0.45 + Math.random() * 1.0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      if (frame % 2) return;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const headY = drops[i] * fontSize;
        const x = i * fontSize + fontSize / 2;

        for (let trail = 0; trail < 13; trail++) {
          const y = headY - trail * fontSize;
          if (y < -fontSize || y > height + fontSize) continue;

          const char = glyphs[Math.floor(Math.random() * glyphs.length)];
          const alpha = Math.max(0.08, 1 - trail / 14);

          ctx.fillStyle = trail === 0
            ? `rgba(220,255,230,${alpha})`
            : `rgba(0,255,90,${alpha * 0.82})`;
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = trail === 0 ? 12 : 5;
          ctx.fillText(char, x, y);
        }

        drops[i] += speeds[i];
        if (headY > height + 13 * fontSize) {
          drops[i] = Math.random() * -28;
          speeds[i] = 0.45 + Math.random() * 1.0;
        }
      }
      ctx.shadowBlur = 0;
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--rx", `${(0.5 - py) * 18}deg`);
    card.style.setProperty("--ry", `${(px - 0.5) * 22}deg`);
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

      <div
        ref={cardRef}
        className="matrix-portrait-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
      >
        <img
          className="matrix-portrait-image"
          src="/mike-matrix-hero.png"
          alt="Mike in a green Matrix-inspired digital portrait"
        />
        <canvas ref={canvasRef} className="matrix-code-rain" aria-hidden="true" />
        <div className="matrix-pointer-glow" />
        <div className="matrix-scanline" />
      </div>

      <span className="matrix-tag matrix-tag-net">NET</span>
      <span className="matrix-tag matrix-tag-sec">SEC</span>
      <span className="matrix-tag matrix-tag-ops">OPS</span>
    </section>
  );
}
