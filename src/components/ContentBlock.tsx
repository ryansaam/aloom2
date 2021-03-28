import React from 'react'

interface ContentBlockProps {
  backgroundColor: string
  top?: string
  height?: string
  heading: string
  children: React.ReactNode
}
const ContentBlock = ({ backgroundColor, top, height, children }: ContentBlockProps) => {
  return (
    <div style={{
      //backgroundColor: backgroundColor,
      width: "100%",
      height: height || "250%",
      position: "relative",
      top: top
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
}

export default ContentBlock