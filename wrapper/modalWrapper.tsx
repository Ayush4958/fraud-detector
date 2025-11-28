"use client";
import { useState, useEffect } from "react";

export default function ModalWrapper({ onClose, children }: { onClose: () => void ; children: React.ReactNode}) {
  const [fade, setFade] = useState("animate-fadeIn");

  // Fade-out before closing
  const closeWithFade = () => {
    setFade("animate-fadeOut");
    setTimeout(() => onClose(), 280); // match animation duration
  };

  // Close on ESC key
  useEffect(() => {
    const handler = (e:any) => {
      if (e.key === "Escape") closeWithFade();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={`${fade} fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center`}
      onClick={closeWithFade}
    >
      {/* stop click bubbling so inside doesn't close */}
      <div
        className="relative w-full max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
