import React from 'react'

export default function Helment(props) {
    document.title = "Rimberio - " + props.title
  return (
    <div>{props.children}</div>
  )
}
