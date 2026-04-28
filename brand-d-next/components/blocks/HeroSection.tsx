'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 240;
    // Updated to .webp for smaller file sizes
    const currentFrame = (index: number) =>
      `/scrolldown/ezgif-frame-${index.toString().padStart(3, '0')}.webp`;

    const images: HTMLImageElement[] = [];
    let playhead = 0;
    const baseSpeed = 0.3;
    let scrollSpeed = 0;
    let targetScrollSpeed = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    setTimeout(resize, 0);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      targetScrollSpeed = Math.abs(st - lastScrollTop) * 0.15;
      lastScrollTop = st <= 0 ? 0 : st;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const renderFrame = (index: number) => {
      if (images[index]?.complete && images[index].naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const loop = () => {
      scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
      targetScrollSpeed *= 0.9;
      playhead += baseSpeed + scrollSpeed;
      if (playhead >= frameCount) playhead = 0;
      renderFrame(Math.floor(playhead));
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      style={{ minHeight: 'calc(100vh - 72px)', marginTop: 72 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-72px)]">

        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-20 lg:py-0 z-10">

          {/* Eyebrow */}
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">
            Performance Marketing for B2B &amp; D2C
          </p>

          {/* Headline */}
          <h1
            className="mb-7 font-black leading-[1.0] tracking-[-0.04em] text-[#0a0a0a]"
            style={{ fontSize: 'clamp(48px, 5.5vw, 80px)' }}
          >
            Drive Revenue.
            <br />
            <span className="text-[#c0c0c0]">Not Just Traffic.</span>
          </h1>

          {/* Sub-copy */}
          <p className="mb-10 max-w-[340px] text-[15px] leading-[1.7] text-[#6b6b6b]">
            We build data-driven growth systems that turn clicks into customers—and customers into revenue.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              id="cta-hero-primary"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-[#0a0a0a] px-7 py-3.5 text-[14px] font-bold tracking-wide text-white transition-all duration-200 hover:bg-[#222]"
            >
              Get Free Growth Plan
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#results"
              id="cta-hero-secondary"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-[#e0e0e0] bg-white px-7 py-3.5 text-[14px] font-bold tracking-wide text-[#0a0a0a] transition-all duration-200 hover:border-[#bbb] hover:bg-[#f5f5f5]"
            >
              See Case Studies
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* ── RIGHT: Canvas Animation ── */}
        <div className="relative min-h-[50vw] lg:min-h-0">
          {/* Smooth left-edge fade into white */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0) 40%)',
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 30%)',
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
