import React from 'react'
import '../App.css'

interface ProfileCardProps {
  imgSrc?: string
  imgAlt?: string
  name: string
  title: string
  desc: string
}
const ProfileCard = ({ imgSrc, imgAlt, name, title, desc }: ProfileCardProps) => {
  return (
    <div className="profileCard">
      <div className="profileCardImgContainer">
        <img className="profileCardImg" src={imgSrc} alt={imgAlt} />
        <div className="profileTextWrapper">
          <h1 className="profileCardName">{ name }</h1>
          <h1 className="profileCardTitle">{ title }</h1>
        </div>
      </div>
      <div>
        <p className="profileCardDesc">{ desc }</p>
      </div>
    </div>
  )
}

export default ProfileCard