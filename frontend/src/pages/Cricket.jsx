import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import HomeOfficialPartner from '../components/HomeOfficialPartner'
import CardDisplayWidget from '../components/CardDisplayWidget'
import VideoTutorial from '../components/VideoTutorial'
import { useNavigate } from 'react-router-dom'

export default function Cricket() {
  const navigate = useNavigate()
  const handleClickFirstImage = () => {
    navigate('/cricket-match')
  }
  return (
    <>
      <Navbar selectedValue='cricket' />
      <ImageCarousel />
      <HomeOfficialPartner/>
      <CardDisplayWidget title="Upcoming Matches" functions={[handleClickFirstImage,()=>{},()=>{}]} images={["src/assets/match-thumbnail-indaus.png", "src/assets/match-thumbnail-nzeng.png", "src/assets/match-thumbnail-engwi.png"]} />
      <VideoTutorial/>
    </>
  )
}
