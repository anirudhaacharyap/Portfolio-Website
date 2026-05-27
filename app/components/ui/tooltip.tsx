"use client"

import * as React from "react"
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface TooltipProps {
  children: React.ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)

  // Find trigger and content children
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && (child as React.ReactElement).type === TooltipTrigger
  )
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && (child as React.ReactElement).type === TooltipContent
  )

  const handleMouseEnter = () => setOpen(true)
  const handleMouseLeave = () => setOpen(false)

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {trigger && React.cloneElement(trigger as React.ReactElement<any>)}
      <AnimatePresence>
        {open && content && React.cloneElement(content as React.ReactElement<any>, { key: "content" })}
      </AnimatePresence>
    </div>
  )
}

export function TooltipTrigger({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}

export function TooltipContent({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 overflow-hidden bg-[#0B0B0C] border border-[#1A1A1C] px-3 py-1.5 font-mono text-[10px] text-white shadow-md bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs whitespace-normal pointer-events-none rounded-none"
      {...props}
    >
      {children}
    </motion.div>
  )
}
