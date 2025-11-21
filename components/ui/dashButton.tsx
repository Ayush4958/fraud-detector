"use client"

import { useState } from "react"

export function DashboardButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-8 py-3 mx-10 font-semibold text-lg rounded-lg overflow-hidden group transition-all duration-300"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
          : "linear-gradient(135deg, #022c47 0%, #0c3a52 100%)",
        border: "2px solid #0891b2",
        boxShadow: isHovered
          ? "0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)"
          : "0 0 10px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(6, 182, 212, 0.1)",
        color: isHovered ? "#ffffff" : "#e0f2fe",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          animation: isHovered ? "shimmer 2s infinite" : "none",
        }}
      ></span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg
          className="transition-all duration-300"
          style={{
            width: isHovered ? "24px" : "20px",
            height: isHovered ? "24px" : "20px",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
          fill={isHovered ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Dashboard
      </span>
    </button>
  )
}
