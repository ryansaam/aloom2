import React from 'react'
import "../App.css"

interface TransitionButtonProps {
  bottom?: boolean
  className?: string
  onClick: () => void
  children: React.ReactNode
}
const TransitionButton = React.forwardRef<HTMLSpanElement, TransitionButtonProps>(({ bottom, className, onClick, children }, ref) => {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "rgba(0,0,0,0)",
        outline: "none",
        border: "none",
        gridRow: bottom ? "3/4" : "1/2"
      }}
    >
      <span className={className} ref={ref} style={{
        fontSize: "30px",
        fontWeight: 600,
        letterSpacing: "3px",
        color: "white",
        opacity: "0.0",
        display: "block"
      }}>{ children }</span>
    </button>
  ) 
})

export default TransitionButton