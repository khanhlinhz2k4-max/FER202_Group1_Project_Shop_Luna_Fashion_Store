import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--primary-brown)] text-[#FAF7F2] shadow",
        secondary:
          "border-transparent bg-[var(--light-cream)] text-[var(--primary-brown)]",
        destructive:
          "border-transparent bg-red-600 text-white shadow",
        outline: "text-[var(--text-primary)] border-[var(--border-subtle)]",
        luxury: "border-[#E0B77C]/40 bg-[#775B3F]/10 text-[#775B3F] tracking-widest uppercase font-medium",
        success: "border-emerald-200 bg-emerald-50 text-emerald-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
