"use client";

"use client";

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-background" />

      {/* Radial gradient glow in top-left */}
      <div
        className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] opacity-20"
        style={{
          background: `
            radial-gradient(circle at 30% 30%,
              rgba(0, 240, 255, 0.08) 0%,
              rgba(0, 240, 255, 0.04) 20%,
              transparent 50%
            )
          `,
        }}
      />

      {/* Secondary glow in bottom-right with accent color */}
      <div
        className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] opacity-10"
        style={{
          background: `
            radial-gradient(circle at 70% 70%,
              rgba(168, 85, 247, 0.12) 0%,
              rgba(168, 85, 247, 0.06) 25%,
              transparent 50%
            )
          `,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,5,7,0.8), transparent)',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, rgba(5,5,7,0.9), transparent)',
        }}
      />
    </div>
  );
}
