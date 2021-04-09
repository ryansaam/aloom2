import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ButtonLinkProps {
  to: string
  color?: string
  children: React.ReactNode
  onClick?: () => void
}
const ButtonLink = ({ to, color, children, onClick }: ButtonLinkProps) => {
  return (
    <Link style={{textDecoration: "none"}} to={to} onClick={() => {
      window.scrollTo(0,0)
      if (onClick) onClick()
    }}>
      <FakeButton color={color}>
        <p style={{margin: "auto"}}>{ children }</p>
      </FakeButton>
    </Link>
  )
}
interface FakeButtonProps {
  color?: string
}
const FakeButton = styled.div<FakeButtonProps>`
  background-color: ${props => props.color || "black"};
  color: white;
  font-weight: 600;
  width: 150px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 10px;
  display: grid;
  justify-items: center;
`

export default ButtonLink