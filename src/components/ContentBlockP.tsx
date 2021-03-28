import React from 'react'

interface ContentBlockPProps {
  opacity?: number,
  children: React.ReactNode
}
const ContentBlockP = ({ opacity, children }: ContentBlockPProps) => {
  return (
    <p className="contentBlockP" style={{margin: "20px 0px", opacity: opacity}}>{ children }</p>
  )
}

export default ContentBlockP