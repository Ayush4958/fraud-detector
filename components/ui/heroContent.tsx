"use client";
import { Button } from '@/components/ui/button';

export default function HeroContent() {
  return (
    <>
    {/* <div className="min-h-screen flex flex-col justify-between px-6 py-8 md:px-12 md:py-16"> */}

      {/* Hero content */}
      <div className="flex flex-col items-center justify-center text-center flex-1">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-400/30 bg-emerald-400/10">
            Advanced Fraud Detection
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
          Detect & Prevent Fraud in Real-Time
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
          Protect your business with AI-powered fraud detection. Analyze transactions instantly and stop fraudulent activity before it happens.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90 font-semibold">
            Start Free Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            >
            Watch Demo
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span>
            <span>Real-Time Analysis</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white/50 text-xs">
        <p>Trusted by 500+ businesses worldwide</p>
      </div>
    {/* </div> */}
        </>
  );
}
