"use client"

import { useState } from "react"

export function BillAnalysisButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-8 py-3 mx-10 font-semibold text-lg rounded-lg overflow-hidden group transition-all duration-300"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)"
          : "linear-gradient(135deg, #0c3a52 0%, #022c47 100%)",
        border: "2px solid #06b6d4",
        boxShadow: isHovered
          ? "0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)"
          : "0 0 10px rgba(6, 182, 212, 0.2), inset 0 0 10px rgba(6, 182, 212, 0.1)",
        color: isHovered ? "#ffffff" : "#a5f3fc",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      <span
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(6, 182, 212, 0.4), transparent, rgba(6, 182, 212, 0.4))",
          animation: isHovered ? "borderPulse 1.5s ease-in-out infinite" : "none",
        }}
      ></span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg
          className="transition-all duration-300"
          style={{
            width: isHovered ? "20px" : "20px",
            height: isHovered ? "24px" : "20px",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
          fill={isHovered ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            // strokeLinecap="round"
            // strokeLinejoin="round"
            strokeWidth={1}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Features
      </span>
    </button>
  )
}
