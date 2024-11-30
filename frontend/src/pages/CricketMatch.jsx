import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

export default function CricketMatch() {
  const matches = [
    {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
    {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"England","team2":"South Africa","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
  ]
  return (
    <>
    <Navbar selectedValue="cricket"/>
    <MatchCarousel type="contest-join" matches={matches} />
    </>
  )
}
