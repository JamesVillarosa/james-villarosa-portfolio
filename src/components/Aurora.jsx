export default function Aurora() {
  return (
    <div aria-hidden="true" style={styles.wrapper}>
      <div style={styles.gradientBase} />

      <div style={{ ...styles.ribbon, ...styles.ribbon1 }} />
      <div style={{ ...styles.ribbon, ...styles.ribbon2 }} />
      <div style={{ ...styles.ribbon, ...styles.ribbon3 }} />
      <div style={{ ...styles.ribbon, ...styles.ribbon4 }} />
      <div style={{ ...styles.ribbon, ...styles.ribbon5 }} />

      <div style={styles.sheen} />
      <div style={styles.grain} />

      <style>{`
        @keyframes aurora-drift-1 {
          0%   { transform: translate3d(-20%, -15%, 0) rotate(0deg)   scale(1); }
          25%  { transform: translate3d(15%, 10%, 0)  rotate(40deg)  scale(1.15); }
          50%  { transform: translate3d(25%, -5%, 0)  rotate(80deg)  scale(0.95); }
          75%  { transform: translate3d(-10%, 20%, 0) rotate(120deg) scale(1.2); }
          100% { transform: translate3d(-20%, -15%, 0) rotate(180deg) scale(1); }
        }
        @keyframes aurora-drift-2 {
          0%   { transform: translate3d(20%, 15%, 0)  rotate(0deg)    scale(1); }
          25%  { transform: translate3d(-15%, -10%, 0) rotate(-50deg) scale(1.1); }
          50%  { transform: translate3d(-25%, 18%, 0)  rotate(-100deg) scale(1.2); }
          75%  { transform: translate3d(12%, -18%, 0)  rotate(-150deg) scale(0.92); }
          100% { transform: translate3d(20%, 15%, 0)   rotate(-200deg) scale(1); }
        }
        @keyframes aurora-drift-3 {
          0%   { transform: translate3d(-15%, 20%, 0) rotate(0deg)    scale(1); }
          33%  { transform: translate3d(25%, -25%, 0) rotate(70deg)   scale(1.25); }
          66%  { transform: translate3d(-22%, -10%, 0) rotate(140deg) scale(0.9); }
          100% { transform: translate3d(-15%, 20%, 0)  rotate(220deg) scale(1); }
        }
        @keyframes aurora-drift-4 {
          0%   { transform: translate3d(22%, -18%, 0)  rotate(0deg)    scale(1); }
          50%  { transform: translate3d(-25%, 22%, 0)  rotate(-90deg)  scale(1.18); }
          100% { transform: translate3d(22%, -18%, 0)  rotate(-180deg) scale(1); }
        }
        @keyframes aurora-drift-5 {
          0%   { transform: translate3d(0%, 0%, 0)   rotate(0deg) scale(1); }
          50%  { transform: translate3d(15%, -20%, 0) rotate(60deg) scale(1.3); }
          100% { transform: translate3d(0%, 0%, 0)   rotate(120deg) scale(1); }
        }
        @keyframes aurora-sheen {
          0%   { transform: translateX(-30%) translateY(-10%) rotate(-12deg); opacity: 0.25; }
          50%  { transform: translateX(30%)  translateY(10%)  rotate(-12deg); opacity: 0.45; }
          100% { transform: translateX(-30%) translateY(-10%) rotate(-12deg); opacity: 0.25; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-ribbon, .aurora-sheen { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  gradientBase: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, #f8faff 0%, #eef3ff 40%, #e6eeff 70%, #f0f4ff 100%)',
  },
  ribbon: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(70px)',
    willChange: 'transform',
  },
  ribbon1: {
    width: '70vw',
    height: '70vw',
    top: '-20%',
    left: '-15%',
    background:
      'radial-gradient(closest-side, rgba(96,165,250,0.75), rgba(96,165,250,0) 70%)',
    animation: 'aurora-drift-1 18s ease-in-out infinite',
  },
  ribbon2: {
    width: '65vw',
    height: '65vw',
    top: '10%',
    right: '-20%',
    background:
      'radial-gradient(closest-side, rgba(37,99,235,0.55), rgba(37,99,235,0) 70%)',
    animation: 'aurora-drift-2 22s ease-in-out infinite',
  },
  ribbon3: {
    width: '60vw',
    height: '60vw',
    bottom: '-25%',
    left: '5%',
    background:
      'radial-gradient(closest-side, rgba(14,165,233,0.5), rgba(14,165,233,0) 70%)',
    animation: 'aurora-drift-3 24s ease-in-out infinite',
  },
  ribbon4: {
    width: '50vw',
    height: '50vw',
    top: '40%',
    left: '25%',
    background:
      'radial-gradient(closest-side, rgba(167,139,250,0.45), rgba(167,139,250,0) 70%)',
    animation: 'aurora-drift-4 20s ease-in-out infinite',
  },
  ribbon5: {
    width: '45vw',
    height: '45vw',
    top: '60%',
    right: '10%',
    background:
      'radial-gradient(closest-side, rgba(244,114,182,0.35), rgba(244,114,182,0) 70%)',
    animation: 'aurora-drift-5 26s ease-in-out infinite',
  },
  sheen: {
    position: 'absolute',
    top: '-20%',
    left: '-20%',
    width: '140%',
    height: '140%',
    background:
      'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
    mixBlendMode: 'overlay',
    animation: 'aurora-sheen 14s ease-in-out infinite',
    willChange: 'transform, opacity',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)',
    backgroundSize: '3px 3px',
    opacity: 0.4,
    mixBlendMode: 'multiply',
  },
}
