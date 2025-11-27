"use client"

import * as React from "react"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const PasswordInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      setShowPassword(!showPassword)
    }

    return (
      // Container div to hold input and toggle button side by side
      <div className="relative w-full">
        {/* Password input field - type changes based on showPassword state */}
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className={cn("pr-12", className)}
          {...props}
        />

        {/* Toggle button positioned absolutely on the right side of input */}
        <button
          onClick={handleTogglePassword}
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200"
          title={showPassword ? "Hide password" : "Show password"}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {/* Display eye icon when password is hidden, eye-off when visible */}
          {showPassword ? (
            <IconEyeOff className="size-4 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <IconEye className="size-4 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>
      </div>
    )
  },
)

// Set display name for debugging and React DevTools
PasswordInput.displayName = "PasswordInput"
