import React from 'react'

interface ContentBlockProps {
  top?: string
  height?: string
  zIndex?: number
  heading: string
  children: React.ReactNode
}
const ContentBlock = React.forwardRef<
  HTMLDivElement,
  ContentBlockProps
>(({ top, height, zIndex, heading, children }, ref ) => {
  return (
    <div ref={ref} style={{
      width: "100%",
      height: height || "250%",
      position: "relative",
      top: top,
      zIndex: zIndex
    }}>
      <div style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        position: "sticky",
        top: "0%",
        boxSizing: "border-box",
        padding: "40px"
      }}>
        { children }
      </div>
    </div>
  )
});
// const ContentBlock = ({ top, height, zIndex, children }: ContentBlockProps) => {
//   return (

//   )
// }

export default ContentBlock