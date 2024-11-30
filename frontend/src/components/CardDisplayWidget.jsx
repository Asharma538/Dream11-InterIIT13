import React from 'react'

export default function CardDisplayWidget(props) {
  return (
    <div id='home-card-display-widget'>
        <br />
        <br />
        <div id='home-card-display-widget-text'>
            <div></div>
            <div><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.title}</h1></div>
            <div><h4 style={{textDecoration:"underline",color:"gray"}}>View All</h4></div>
        </div>
        <div id='home-card-display-widget-img'>
            <img src={props.images[0]} alt="" />
            <img src={props.images[1]} alt="" />
            <img src={props.images[2]} alt="" />
        </div>
    </div>
  )
}
