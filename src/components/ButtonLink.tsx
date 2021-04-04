import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ButtonLinkProps {
  to: string
  children: React.ReactNode
}
const ButtonLink = ({ to, children }: ButtonLinkProps) => {
  return (
    <Link style={{textDecoration: "none"}} to={to} onClick={() => { window.scrollTo(0,0) }}>
      <FakeButton>
        <p style={{margin: "auto"}}>{ children }</p>
      </FakeButton>
    </Link>
  )
}
const FakeButton = styled.div`
  background-color: black;
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