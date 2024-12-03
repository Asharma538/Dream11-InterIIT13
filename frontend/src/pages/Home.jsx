import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import HomeOfficialPartner from '../components/HomeOfficialPartner'
import VideoTutorial from '../components/VideoTutorial'
import CardDisplayWidget from '../components/CardDisplayWidget'
import Chatbot from '../components/Chatbot'

export default function Home() {
    return (
        <>
            <Navbar selectedValue='none' />
            <Chatbot/>
            <ImageCarousel />
            <HomeOfficialPartner />
            <VideoTutorial />
            {/* <CardDisplayWidget title="Meet our winners" functions={[()=>{},()=>{},()=>{}]} images={["src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png"]} /> */}
            <div id='home-winners-containers'>
                <img src="src/assets/winners.jpg" alt="" />
            </div>
            <div id='home-break-line' />

            <div id='home-other-sports'>
                <img src="src/assets/download-app.png" alt="download-app" width="75%"/>
                <img src="src/assets/home-other-sports.png" alt="home-other-sports" width="75%"/>
                <img src="src/assets/footer.png" alt="footer" width="100%"/>
            </div>
        </>
    )
}
