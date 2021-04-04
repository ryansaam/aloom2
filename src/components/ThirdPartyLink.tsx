import React from 'react'

interface ThirdPartyLinkProps {
  href: string
  children: React.ReactNode
}
const ThirdPartyLink = ({ href, children }: ThirdPartyLinkProps) => {
  return (
    <div style={{backgroundColor: "black", width: "340px", borderRadius: "20px"}}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{textDecoration: "none"}}
      >
        <p style={{color: "white", padding: "20px"}}>{ children }</p>
      </a>
    </div>
  )
}

export default ThirdPartyLink