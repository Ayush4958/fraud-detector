"use client"
import { useState, useEffect } from "react"
import Signup from "@/components/signup-form-demo"

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).toggleLoginModal = () => setIsOpen((prev) => !prev)
      ;(window as any).openLoginModal = () => setIsOpen(true)
      ;(window as any).closeLoginModal = () => setIsOpen(false)
    }
  }, [])

  return (
    <>
      {/* Hidden trigger - will be triggered by navbar */}
      <div id="login-modal-trigger" style={{ display: "none" }} />

      {/* Modal Backdrop with Blur */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      {/* Modal Content */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-12">
          <div className="relative w-full max-w-md h-fit">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300 transition-colors"
            >
              ✕
            </button>

            <Signup />
          </div>
        </div>
      )}
    </>
  )
}

export function useLoginModal() {
  return {
    toggle: () => (window as any).toggleLoginModal?.(),
    open: () => (window as any).openLoginModal?.(),
    close: () => (window as any).closeLoginModal?.(),
  }
}
