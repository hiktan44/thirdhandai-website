import { useEffect, useRef, useState } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Detect if device is low-performance (mobile or reduced motion preference)
  const isLowPerformance = useRef(
    typeof window !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Limit DPR to improve performance
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    window.addEventListener('resize', handleResize);

    // Reduce stars count on low-performance devices
    const starCount = isLowPerformance.current ? 100 : 200;
    const stars: Array<{x: number, y: number, size: number, brightness: number}> = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * container.clientWidth,
        y: Math.random() * container.clientHeight,
        size: Math.random() * 2,
        brightness: Math.random()
      });
    }

    // Pre-create gradients to avoid recreating them every frame
    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, container.clientHeight);
    backgroundGradient.addColorStop(0, '#020617');
    backgroundGradient.addColorStop(1, '#000000');

    // Animation
    let animationId: number;
    let lastFrameTime = 0;
    const targetFPS = isLowPerformance.current ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime - (elapsed % frameInterval);

      // Clear canvas with gradient
      ctx.fillStyle = backgroundGradient;
      ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);

      // Draw grid (only on high-performance devices)
      if (!isLowPerformance.current) {
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.lineWidth = 1;
        const gridSize = 50;

        ctx.beginPath();
        for (let x = 0; x < container.clientWidth; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, container.clientHeight);
        }
        for (let y = 0; y < container.clientHeight; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(container.clientWidth, y);
        }
        ctx.stroke();
      }

      // Draw stars with batch operations
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      stars.forEach(star => {
        star.brightness += (Math.random() - 0.5) * 0.1;
        star.brightness = Math.max(0.3, Math.min(1, star.brightness));

        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw floating orbs (skip on low-performance devices)
      if (!isLowPerformance.current) {
        const time = currentTime * 0.001;

        // Blue orb
        const blueX = container.clientWidth * 0.25 + Math.sin(time * 0.8) * 100;
        const blueY = container.clientHeight * 0.25 + Math.cos(time * 0.8) * 100;
        const blueGradient = ctx.createRadialGradient(blueX, blueY, 0, blueX, blueY, 250);
        blueGradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        blueGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = blueGradient;
        ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);

        // Purple orb
        const purpleX = container.clientWidth * 0.75 + Math.sin(time * 0.6) * 80;
        const purpleY = container.clientHeight * 0.75 + Math.cos(time * 0.6) * 80;
        const purpleGradient = ctx.createRadialGradient(purpleX, purpleY, 0, purpleX, purpleY, 250);
        purpleGradient.addColorStop(0, 'rgba(147, 51, 234, 0.5)');
        purpleGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        ctx.fillStyle = purpleGradient;
        ctx.fillRect(0, 0, container.clientWidth, container.clientHeight);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}