import React, { useEffect, useRef } from 'react';

/**
 * GoldenCursorTrail Component
 * Luxury Champagne Gold Stardust & Ambient Sparkle Cursor Trail
 * Style: Luxury × Modern Trendy × Soft Feminine
 *
 * Emits delicate shimmering gold dust and 4-point micro-sparkles
 * that gently float and fade away as the user moves their cursor.
 * 100% non-blocking (pointer-events: none), 60 FPS, touch-safe.
 */
export default function GoldenCursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on touch-only devices (tablets/phones without mouse)
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle pool
    const particles = [];
    const maxParticles = 65;
    const goldPalette = [
      '#FFFDF5', // Pearl Diamond White
      '#FEE3AF', // Light Cream Silk
      '#E0B77C', // Warm Champagne Gold
      '#CAA072', // Soft Caramel Bronze
      '#D4AF37', // Pure Gold Shimmer
    ];

    let lastX = -100;
    let lastY = -100;
    let animFrameId = null;

    // Draw a delicate 4-pointed sparkle star
    const drawSparkle = (context, x, y, size, rotation, alpha, color) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = color;
      context.globalAlpha = alpha;

      // Glow halo
      const glow = context.createRadialGradient(0, 0, 0, 0, 0, size * 2.2);
      glow.addColorStop(0, color);
      glow.addColorStop(0.5, 'rgba(254, 227, 175, 0.4)');
      glow.addColorStop(1, 'rgba(254, 227, 175, 0)');
      context.fillStyle = glow;
      context.beginPath();
      context.arc(0, 0, size * 2.2, 0, Math.PI * 2);
      context.fill();

      // 4-point diamond star
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(0, -size * 1.8);
      context.quadraticCurveTo(0, 0, size * 1.8, 0);
      context.quadraticCurveTo(0, 0, 0, size * 1.8);
      context.quadraticCurveTo(0, 0, -size * 1.8, 0);
      context.quadraticCurveTo(0, 0, 0, -size * 1.8);
      context.fill();

      context.restore();
    };

    // Emit particles on mouse movement
    const onMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      const dist = Math.hypot(currentX - lastX, currentY - lastY);

      // Only spawn if mouse actually moved
      if (dist > 4) {
        const count = Math.min(3, Math.floor(dist / 6) + 1);

        for (let i = 0; i < count; i++) {
          if (particles.length < maxParticles) {
            const isStar = Math.random() < 0.35; // 35% chance to be a 4-point star sparkle
            const speed = 0.4 + Math.random() * 0.9;
            const angle = Math.random() * Math.PI * 2;
            const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];

            particles.push({
              x: currentX + (Math.random() - 0.5) * 8,
              y: currentY + (Math.random() - 0.5) * 8,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.25, // gentle float upward
              size: isStar ? 2.2 + Math.random() * 2.4 : 1.2 + Math.random() * 2.0,
              isStar,
              rotation: Math.random() * Math.PI,
              rotSpeed: (Math.random() - 0.5) * 0.08,
              alpha: 0.9,
              decay: 0.02 + Math.random() * 0.025, // Fades smoothly in ~0.6s
              color,
            });
          }
        }

        lastX = currentX;
        lastY = currentY;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;
        p.size *= 0.985; // gently shrink as it fades

        if (p.alpha <= 0.01 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawSparkle(ctx, p.x, p.y, p.size, p.rotation, p.alpha, p.color);
        } else {
          // Circular stardust particle with soft light gradient
          ctx.save();
          ctx.globalAlpha = p.alpha;
          const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          radGrad.addColorStop(0, p.color);
          radGrad.addColorStop(0.5, 'rgba(254, 227, 175, 0.5)');
          radGrad.addColorStop(1, 'rgba(224, 183, 124, 0)');

          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.restore();
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="golden-cursor-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999, // Floating delicately above all layers without blocking any click
      }}
    />
  );
}
