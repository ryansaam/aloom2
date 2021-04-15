import React from 'react'
import styled from 'styled-components'
import {
  Link
} from "react-router-dom"

interface Props {
  companyLinks?: React.ReactNode
  productLinks?: React.ReactNode
  onClick: () => void
}
const BackToSurfaceButton = ({ companyLinks, productLinks, onClick }: Props) => {
  const selected = window.location.pathname.replace("/", "")

  return (
    <Container>
      <NavContainer
        onClick={() => {
          onClick()
        }}
      >
        <div>
          <div style={{display: "grid", gridTemplateColumns: "22px auto", alignItems: "center"}}>
            { selected === "home" ? <Arrow /> : null }
            <Link style={{textDecoration: "none", color: "white", fontWeight: 600}} to="/home">Home</Link>
          </div>
        </div>

        <div>
          <div style={{display: "grid", gridTemplateColumns: "22px auto", alignItems: "center", marginLeft: selected !== "company" ? "8px" : "0px"}}>
            { selected === "company" ? <Arrow /> : null }
            <Link style={{textDecoration: "none", color: "white", fontWeight: 600}} to="/company">Company</Link>
          </div>
          { companyLinks }
        </div>

        <div>
          <div style={{display: "grid", gridTemplateColumns: "22px auto", alignItems: "center", marginLeft: selected !== "product" ? "8px" : "0px"}}>
            { selected === "product" ? <Arrow /> : null }
            <Link style={{textDecoration: "none", color: "white", fontWeight: 600}} to="/product">Product</Link>
          </div>
          { productLinks }
        </div>

      </NavContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 110px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 30;
`
const NavContainer = styled.div`
  background-color: #242424;
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  display: grid;
  gap: 5px;
  align-items: center;
  overflow: hidden;
`

const Arrow = () => {
  return (
    <svg style={{transform: "rotate(180deg)"}} height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g data-name="Layer 2" id="Layer_2">
        <path fill="white" d="M20,25a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,0-1.42l8-8a1,1,0,1,1,1.42,1.42L13.41,16l7.3,7.29a1,1,0,0,1,0,1.42A1,1,0,0,1,20,25Z"/>
      </g>
    </svg>
  )
}

export default BackToSurfaceButton