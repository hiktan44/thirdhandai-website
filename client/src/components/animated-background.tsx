import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random stars
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2
  }));

  // Generate geometric shapes
  const shapes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: 20 + i * 15,
    top: 20 + Math.random() * 60,
    delay: i * 0.5,
    duration: 10 + Math.random() * 5
  }));

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #020617 0%, #000 100%)',
        zIndex: 0
      }}
    >
      {/* AI Grid Pattern with animation */}
      <div 
        className="absolute inset-0 w-full h-full animate-grid-pulse"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Stars */}
      <div className="absolute inset-0 w-full h-full">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: '0',
            height: '0',
            borderLeft: '25px solid transparent',
            borderRight: '25px solid transparent',
            borderBottom: '50px solid rgba(59, 130, 246, 0.2)',
            animationDelay: `${shape.delay}s`
          }}
        />
      ))}
    </div>
  );
}