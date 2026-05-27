import * as React from "react"
import { clsx } from "clsx"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-[family-name:var(--font-space-mono)] text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
        variant === "outline" && "border border-[#00FF66] bg-transparent text-[#00FF66] hover:bg-[#00FF66] hover:text-[#0B0B0C]",
        variant === "default" && "bg-white text-black hover:bg-[#00FF66] hover:text-black",
        className
      )}
      {...props}
    />
  )
}
