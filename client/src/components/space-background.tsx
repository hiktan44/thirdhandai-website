import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars
    const stars: Array<{x: number, y: number, size: number, brightness: number}> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        brightness: Math.random()
      });
    }

    // Animation
    let animationId: number;
    const animate = () => {
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw stars
      stars.forEach(star => {
        star.brightness += (Math.random() - 0.5) * 0.1;
        star.brightness = Math.max(0.3, Math.min(1, star.brightness));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating orbs
      const time = Date.now() * 0.001;
      
      // Blue orb
      const blueGradient = ctx.createRadialGradient(
        canvas.width * 0.25 + Math.sin(time * 0.5) * 50,
        canvas.height * 0.25 + Math.cos(time * 0.5) * 50,
        0,
        canvas.width * 0.25 + Math.sin(time * 0.5) * 50,
        canvas.height * 0.25 + Math.cos(time * 0.5) * 50,
        200
      );
      blueGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      blueGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = blueGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Purple orb
      const purpleGradient = ctx.createRadialGradient(
        canvas.width * 0.75 + Math.sin(time * 0.3) * 30,
        canvas.height * 0.75 + Math.cos(time * 0.3) * 30,
        0,
        canvas.width * 0.75 + Math.sin(time * 0.3) * 30,
        canvas.height * 0.75 + Math.cos(time * 0.3) * 30,
        200
      );
      purpleGradient.addColorStop(0, 'rgba(147, 51, 234, 0.3)');
      purpleGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = purpleGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}