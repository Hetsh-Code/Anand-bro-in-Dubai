import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function BackgroundBubbles() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft elastic springs to follow mouse position smoothly
  const springX = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 120 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      const handleMouseMove = (e: MouseEvent) => {
        // Map cursor relative to viewport center
        mouseX.set(e.clientX - 150);
        mouseY.set(e.clientY - 150);
      };
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#020510]">
      {/* Dynamic Grid Background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial soft ambient background glow */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-sky-950/20 via-slate-950/5 to-transparent filter blur-3xl" />

      {/* Fluid Liquid Bubble 1 (Teal/Cyan) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -90, 60, 0],
          scale: [1, 1.15, 0.9, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[110px] top-[10%] left-[5%]"
      />

      {/* Fluid Liquid Bubble 2 (Peach/Orange representing desert atmosphere) */}
      <motion.div
        animate={{
          x: [0, -60, 80, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.85, 1.2, 1],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-rose-500/8 blur-[130px] bottom-[15%] right-[8%]"
      />

      {/* Fluid Liquid Bubble 3 (Luxury Gold represent Burj Al Arab vibes) */}
      <motion.div
        animate={{
          x: [0, 50, -60, 0],
          y: [0, 70, -70, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute w-[380px] h-[380px] rounded-full bg-amber-500/10 blur-[100px] top-[40%] left-[35%]"
      />

      {/* Interactive Drag/Move Liquid Glass Ball following cursor */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-indigo-500/5 to-pink-500/5 blur-[90px] filter saturate-150 opacity-80"
      />

      {/* Decorative absolute subtle liquid rings */}
      <div className="absolute top-[20%] right-[30%] w-72 h-72 border border-white/[0.02] rounded-full pointer-events-none" />
      <div className="absolute bottom-[30%] left-[20%] w-96 h-96 border border-white/[0.015] rounded-full pointer-events-none" />
    </div>
  );
}
