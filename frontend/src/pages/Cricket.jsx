import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import HomeOfficialPartner from '../components/HomeOfficialPartner'
import CardDisplayWidget from '../components/CardDisplayWidget'
import VideoTutorial from '../components/VideoTutorial'
import { useNavigate } from 'react-router-dom'
import Chatbot from '../components/Chatbot'

export default function Cricket() {
  const navigate = useNavigate()
  const handleClickFirstImage = () => {
    navigate('/cricket-match')
  }
  return (
    <>
      <Navbar selectedValue='cricket' />
      <Chatbot/>
      <ImageCarousel />
      <HomeOfficialPartner/>
      <CardDisplayWidget title="Upcoming Matches" functions={[handleClickFirstImage,()=>{},()=>{}]} images={["src/assets/match-thumbnail-indsa.jpg", "src/assets/match-thumbnail-wi-sa.jpg", "src/assets/match-thumbnail-usaeng.jpg"]} />
      <VideoTutorial/>
    </>
  )
}
