import React from 'react'
import "../App.css"

interface TransitionButtonProps {
  bottom?: boolean
  className?: string
  padding?: boolean
  children: React.ReactNode
  onClick: () => void
}
const TransitionButton = React.forwardRef<HTMLSpanElement, TransitionButtonProps>(({ bottom, className, padding, children, onClick }, ref) => {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      style={{
        width: "180px",
        height: "100px",
        backgroundColor: "rgba(0,0,0,0)",
        outline: "none",
        border: "none",
        gridRow: bottom ? "3/4" : "1/2",
        cursor: "pointer"
      }}
    >
      <span className={className} ref={ref} style={{
        border: "3px solid white",
        borderRadius: "25px",
        boxSizing: "border-box",
        paddingBottom: padding ? "4px" : "0px",
        fontSize: "24px",
        fontWeight: 600,
        letterSpacing: "3px",
        color: "white",
        display: "block"
      }}>{ children }</span>
    </button>
  ) 
})

export default TransitionButton