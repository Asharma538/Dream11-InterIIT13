import React from 'react'
import redBg from '../assets/red-bg.png';


export default function VideoTutorial() {
  return (
    <div id='video-tutorial'>
        <div id='video-tutorial-text'><h1>How to Play?</h1></div>
        <div id='video-tutorial-img' style={{ backgroundImage: `url(${redBg})`}} >
            <img src="src/assets/dream-ai-robot.png" alt="dream-ai-robot" />
            <img src="src/assets/video-tutorial.png" alt="video-tutorial" />
        </div>
    </div>
  )
}
