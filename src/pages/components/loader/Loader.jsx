import React from 'react';
import ReactDOM from "react-dom"

export default function Loader() {
  return ReactDOM.createPortal(
    <div className='video'>
      <video src="./img/Black and Peach Aesthetic Minimalist Loading Video.mp4"></video>
    </div>,
    document.getElementById("loader")
  )
}
