import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import HomeOfficialPartner from '../components/HomeOfficialPartner'
import CardDisplayWidget from '../components/CardDisplayWidget'
import VideoTutorial from '../components/VideoTutorial'

export default function Cricket() {
  return (
    <>
      <Navbar/>
      <ImageCarousel />
      <HomeOfficialPartner/>
      <CardDisplayWidget title="Upcoming Matches" images={["src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png", "src/assets/empty-image-for-winners.png"]} />
      <VideoTutorial/>
    </>
  )
}
