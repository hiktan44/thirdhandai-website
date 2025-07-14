import './animated-background.css';

export default function AnimatedBackground() {
  // Generate random stars
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 3 + 2}s`
  }));

  // Generate geometric shapes
  const shapes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    left: `${20 + i * 15}%`,
    top: `${20 + Math.random() * 60}%`,
    animationDelay: `${i * 0.5}s`,
    animationDuration: `${10 + Math.random() * 5}s`
  }));

  return (
    <div className="animated-background">
      {/* AI Grid Pattern */}
      <div className="ai-grid" />
      
      {/* Stars */}
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="geometric-shape triangle"
          style={{
            left: shape.left,
            top: shape.top,
            animationDelay: shape.animationDelay,
            animationDuration: shape.animationDuration
          }}
        />
      ))}
    </div>
  );
}