import React from 'react'
import redBg from '../assets/red-bg.png';
import { useNavigate } from 'react-router-dom';

export default function VideoTutorial() {
  const navigate = useNavigate();
  return (
    <div id='video-tutorial'>
        <div id='video-tutorial-text'><h1>How to Play?</h1></div>
        <div id='video-tutorial-img' style={{ backgroundImage: `url(${redBg})`, backgroundSize:"cover"}} >
            <div>
              <img src="src/assets/stadium.png" alt="dream-ai-robot" />
              <div style={{color: "white",width:"100%",display:"flex",justifyContent:"center",fontSize:"20px",alignItems:"end",cursor:'pointer'}}>Stuggling to find a Team? Let us help with &nbsp; <u style={{fontSize:"24px",color:"hsla(49, 100%, 57%, 1)"}} onClick={()=>{navigate("/dream-ai")}}>Dream AI</u></div>
            </div>
            <video src="src/assets/how_to_play.mp4" autoPlay controls muted></video>
        </div>
    </div>
  )
}
