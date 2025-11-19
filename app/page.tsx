"use client";
import FloatingLines from '@/components/ui/FloatingLines';
import HeroContent from '@/components/heroContent';
import { NavbarRes } from '@/components/navbar';

export default function Home() {
  return (
    <>
      <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
        {/* Animated background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <FloatingLines
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[6, 7, 8]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>

        <div className='bg-gradient-to-b from-[#123249] via-[#2D5B75] to-transparent border-b border-[#447794]/30 backdrop-blur-md' style={{ position: 'relative', zIndex: 20 }}>
        <NavbarRes />
      </div>

      </div>
    </>
  );
}
