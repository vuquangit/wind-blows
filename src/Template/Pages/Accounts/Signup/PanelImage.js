import React from 'react'
// import { Image, Transformation } from "cloudinary-react";

const PanelImage = () => {
  const urlImage =
    'https://res.cloudinary.com/dnzsa2z7b/image/upload/c_scale,w_600/v1581835305/the-wind-blows/Project%20image/SignIn_Panel.jpg'

  return (
    <div className='email-signup__panel-image'>
      <div
        style={{ backgroundImage: `url(${urlImage})` }}
        className='backgroundImage'
      />
      {/* <Image
        publicId="the-wind-blows/Project%20image/Signup_panel.jpg"
        className="email-signup__panel-image--content"
      >
        <Transformation width="600" crop="fill" />
      </Image> */}
    </div>
  )
}

export default PanelImage
