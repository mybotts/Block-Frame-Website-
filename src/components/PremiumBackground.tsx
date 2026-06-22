"use client";

export default function PremiumBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base background — uses CSS variable */}
      <div className="absolute inset-0 bg-background" />

      {/* Top-left cyan glow */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] opacity-25"
        style={{
          background: `
            radial-gradient(circle at 30% 30%,
              var(--color-glow) 0%,
              var(--color-glow-secondary) 25%,
              transparent 55%
            )
          `,
        }}
      />

      {/* Mid-page ambient glow */}
      <div
        className="absolute top-[40%] left-[20%] h-[50%] w-[60%] opacity-15"
        style={{
          background: `
            radial-gradient(ellipse at 40% 50%,
              var(--color-glow) 0%,
              var(--color-glow-secondary) 30%,
              transparent 60%
            )
          `,
        }}
      />

      {/* Bottom-right slate depth */}
      <div
        className="absolute -bottom-[35%] -right-[20%] h-[80%] w-[80%] opacity-20"
        style={{
          background: `
            radial-gradient(circle at 70% 70%,
              rgba(80, 92, 110, 0.12) 0%,
              rgba(80, 92, 110, 0.05) 26%,
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
            linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, var(--color-background), transparent)',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, var(--color-background), transparent)',
        }}
      />
    </div>
  );
}
