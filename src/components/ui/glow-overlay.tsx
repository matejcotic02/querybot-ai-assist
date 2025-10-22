export const GlowOverlay = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
      style={{ zIndex: -1 }}
    >
      <div 
        className="absolute -top-20 -left-20 w-64 h-64"
        style={{
          background: 'radial-gradient(circle, rgba(192,104,255,0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};
