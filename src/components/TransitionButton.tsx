import React from 'react'
import "../App.css"

interface TransitionButtonProps {
  className: string
  onClick: () => void
  children: React.ReactNode
}
const TransitionButton = React.forwardRef<HTMLSpanElement, TransitionButtonProps>(({ className, onClick, children }, ref) => {
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
        gridRow: className === "hover-down-effect" ? "3/4" : "1/2"
      }}
    >
      <span className={className} ref={ref} style={{
        fontSize: "30px",
        fontWeight: 600,
        letterSpacing: "3px",
        color: "white",
        opacity: "0.6",
        display: "block"
      }}>{ children }</span>
    </button>
  ) 
})

export default TransitionButton