import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

export default function CricketMatch() {
  return (
    <>
      <Navbar selectedValue="cricket" />
      <MatchCarousel type="contest-join" />
      <div id='cricket-match'>
        <br />
        <h4 style={{ fontSize: "23px" }}>Upcoming contest</h4>
        <br />

        <div id='cricket-match-upcoming-contest-cards'>
          <div id='cricket-match-upcoming-contest-card'></div>
          <div id='cricket-match-upcoming-contest-card'></div>
          <div id='cricket-match-upcoming-contest-card'></div>
          <div id='cricket-match-upcoming-contest-card'></div>

        </div>

      </div>
    </>
  )
}
