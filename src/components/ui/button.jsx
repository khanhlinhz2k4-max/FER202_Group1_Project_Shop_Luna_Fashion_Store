import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-brown)] text-[#FAF7F2] shadow hover:brightness-110",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-subtle)]",
        secondary:
          "bg-[var(--light-cream)] text-[var(--primary-brown)] shadow-sm hover:brightness-95",
        ghost: "hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]",
        link: "text-[var(--primary-brown)] underline-offset-4 hover:underline",
        luxury: "bg-gradient-to-r from-[#775B3F] to-[#5C4A3A] text-[#FAF7F2] tracking-wider uppercase font-semibold hover:shadow-md",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-11 rounded-sm px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
