import React from 'react'
import redBg from '../assets/red-bg.png';


export default function BelowCarousel() {
  return (
    <div>
        <div id='home-just-below-carousel'>
                <img src="src/assets/official-partner-below-carousel.png" alt="official-partner-below-carousel"  />
                <h1>How to Play?</h1>
        </div>

        <div id='home-video-tutorial' style={{ backgroundImage: `url(${redBg})`}}>
            <img src="src/assets/dream-ai-robot.png" alt="dream-ai-robot" />
            <img src="src/assets/video-tutorial.png" alt="video-tutorial" />
        </div>

        <div id='home-meet-our-winners'>
            <br />
            <br />
            <h1>Meet our Winners</h1>
            <div>
                <img src="src/assets/empty-image-for-winners.png" alt="" />
                <img src="src/assets/empty-image-for-winners.png" alt="" />
                <img src="src/assets/empty-image-for-winners.png" alt="" />
            </div>
        </div>

        <div id='home-break-line'/>
        

    </div>
  )
}
