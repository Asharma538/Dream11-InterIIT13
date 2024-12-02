import React from 'react'

export default function CardDisplayWidget(props) {
  return (
    <div id='home-card-display-widget'>
        <br />
        <br />
        <div id='home-card-display-widget-text'>
            <div></div>
            <div><h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.title}</h1></div>
            <div id='home-card-display-view-all'><h4 style={{textDecoration:"underline",color:"gray"}}>View All</h4></div>
        </div>
        <div id='home-card-display-widget-img'>
            <img onClick={props.functions[0]} src={props.images[0]} alt="" />
            <img onClick={props.functions[1]} src={props.images[1]} alt="" />
            <img onClick={props.functions[2]} src={props.images[2]} alt="" />
        </div>
    </div>
  )
}
