"use client";
import FloatingLines from '@/components/ui/FloatingLines';
import HeroContent from '@/components/ui/heroContent';
import { div } from 'three/tsl';

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

        {/* Content overlay */}
         <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px', padding: '2rem' }}>
          <HeroContent />
        </div>
      </div>
      </div>
    </>
  );
}
