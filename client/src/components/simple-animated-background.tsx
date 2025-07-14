export default function SimpleAnimatedBackground() {
  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #020617 0%, #000 100%)',
          zIndex: -1
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: -1
        }}
      />
      
      {/* Moving Gradient */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
          `,
          zIndex: -1
        }}
      />
    </>
  );
}