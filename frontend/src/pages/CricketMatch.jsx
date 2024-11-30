import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

export default function CricketMatch() {
  return (
    <>
    <Navbar selectedValue="cricket"/>
    <MatchCarousel type="contest-join" />
    </>
  )
}
