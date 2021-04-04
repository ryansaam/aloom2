import React from 'react'

import ButtonLink from "./ButtonLink"

const BackToSurfaceButton = () => {
  return (
    <div style={{position: "fixed", top: "0px", left: "0px", marginLeft: "20px", marginTop: "20px", zIndex: 30}}>
      <ButtonLink to="/" >Back To Surface</ButtonLink>
    </div>
  )
}

export default BackToSurfaceButton