import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

export default function CricketMatch() {
  return (
    <>
      <Navbar selectedValue="cricket" />
      <MatchCarousel />
      <div id='cricket-match-contests'>
        <br />
        <h4 style={{fontSize:"23px"}}>Select a contest to join</h4>
        <br />
        <div id='cricket-match-contest-both-cards'>
          <div className='cricket-match-contest-card'>
             f
          </div>
          <div className='cricket-match-contest-card'>
             f
          </div>
        </div>
    </div>
    </>
  )
}
