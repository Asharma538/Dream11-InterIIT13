import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import HomeOfficialPartner from '../components/HomeOfficialPartner'
import VideoTutorial from '../components/VideoTutorial'
import CardDisplayWidget from '../components/CardDisplayWidget'

export default function Home() {
    return (
        <>
            <Navbar selectedValue='none' />
            <ImageCarousel />
            <HomeOfficialPartner />
            <VideoTutorial />
            <CardDisplayWidget title="Meet our winners" functions={[()=>{},()=>{},()=>{}]} images={["src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png"]} />
            <div id='home-break-line' />

            <div id='home-other-sports'>
                <img src="src/assets/home-other-sports.png" alt="home-other-sports" />
                <img src="src/assets/download-app.png" alt="download-app" />
                <img src="src/assets/footer.png" alt="footer" />
            </div>
        </>
    )
}
