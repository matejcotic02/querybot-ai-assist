export const GlowOverlay = () => {
  return (
    <div 
      className="glow-overlay dark:block hidden absolute top-0 left-0 w-full h-full pointer-events-none rounded-3xl bg-[radial-gradient(circle,_rgba(192,104,255,0.25)_0%,_transparent_70%)] blur-[40px] mix-blend-normal"
      style={{ zIndex: -1 }}
    />
  );
};
