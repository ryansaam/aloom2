import React from 'react'

import ButtonLink from "./ButtonLink"

interface Props {
  onClick: () => void
}
const BackToSurfaceButton = ({ onClick }: Props) => {
  return (
    <div 
      style={{position: "fixed", top: "0px", left: "0px", marginLeft: "20px", marginTop: "20px", zIndex: 30}}
      onClick={() => {
        onClick()
      }}
    >
      <ButtonLink color="#242424" to="/" >Back To Surface</ButtonLink>
    </div>
  )
}

export default BackToSurfaceButton