"use client";

import { useEffect, useRef } from "react";

export default function DNAHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = 180;
    const H = canvas.height = 420;

    let frame = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const amplitude = 55;
      const wavelength = 90;
      const nodeCount = 22;

      for (let i = 0; i <= nodeCount; i++) {
        const t = (i / nodeCount) * Math.PI * 4 + frame * 0.012;
        const y = (i / nodeCount) * H;
        const x1 = cx + Math.sin(t) * amplitude;
        const x2 = cx + Math.sin(t + Math.PI) * amplitude;
        const alpha = 0.4 + 0.5 * ((Math.sin(t) + 1) / 2);

        // Strand 1 dot
        ctx.beginPath();
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.fill();

        // Strand 2 dot
        ctx.beginPath();
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13, 79, 107, ${0.7})`;
        ctx.fill();

        // Cross bar every ~40px
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Strand 1 curve
      ctx.beginPath();
      for (let i = 0; i <= nodeCount; i++) {
        const t = (i / nodeCount) * Math.PI * 4 + frame * 0.012;
        const y = (i / nodeCount) * H;
        const x = cx + Math.sin(t) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(0, 212, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Strand 2 curve
      ctx.beginPath();
      for (let i = 0; i <= nodeCount; i++) {
        const t = (i / nodeCount) * Math.PI * 4 + frame * 0.012;
        const y = (i / nodeCount) * H;
        const x = cx + Math.sin(t + Math.PI) * amplitude;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(13, 79, 107, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      frame++;
      requestAnimationFrame(draw);
    }

    const animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="opacity-60 pointer-events-none select-none"
      style={{ width: 180, height: 420 }}
    />
  );
}
