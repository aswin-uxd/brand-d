'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) => `/scrolldown/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    let loadedImages = 0;
    let playhead = 0;
    const baseSpeed = 0.3;
    let scrollSpeed = 0;
    let targetScrollSpeed = 0;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedImages++;
      };
      images.push(img);
    }

    // Scroll Velocity
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const delta = Math.abs(st - lastScrollTop);
      targetScrollSpeed = delta * 0.15;
      lastScrollTop = st <= 0 ? 0 : st;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const renderFrame = (index: number) => {
      if (images[index] && images[index].complete) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        const img = images[index];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const loop = () => {
      scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
      targetScrollSpeed *= 0.9;
      
      const currentSpeed = baseSpeed + scrollSpeed;
      playhead += currentSpeed;
      
      if (playhead >= frameCount) {
        playhead = 0;
      }
      
      const frameIndex = Math.floor(playhead);
      renderFrame(frameIndex);
      
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
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <canvas
          ref={canvasRef}
          className="block h-full w-full opacity-60"
        />
      </div>
      <div className="relative z-20 mx-auto max-w-3xl px-4 text-center">
        <h1 className="mb-6 text-balance text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Drive Revenue, Not Just Traffic.
        </h1>
        <p className="mb-8 text-lg text-gray-400 md:text-xl">
          Brand-D is the digital marketing engine that has generated over <strong className="text-white">$3 Billion</strong> in revenue for our clients. Get a custom, data-driven strategy to scale your leads and sales.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
          >
            Get My Free Proposal
          </a>
          <a
            href="#results"
            className="rounded-full border border-gray-700 bg-transparent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-gray-900"
          >
            See Our Results
          </a>
        </div>
      </div>
    </section>
  );
}
