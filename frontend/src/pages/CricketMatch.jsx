import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

function contestTileMaker(){
  return <div id='cricket-match-upcoming-contest-cards'>
    <div className='cricket-match-contest-card'>
      <h3>Prize Pool: <b>Rs. 14 crore</b></h3>
      <br /><hr /><br />
      <div style={{ border: "1px solid black", display: 'flex' }}>
        <div style={{ backgroundColor: "#AD1E1E", height: "3px", width: "50%" }}></div>
        <div style={{ backgroundColor: "white", height: "3px", width: "auto" }}></div>
      </div>
      <div style={{ height: "4px" }}></div>
      <div style={{ color: "gray", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
        <div>32,12,123 left</div>
        <div>64,24,246 spots</div>
      </div>
      <br /><br />
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <div>Prize: Rs. 1 Cr</div>
          <div>Winners: 66%</div>
        </div>
        <button style={{"padding":"10px 20px","border":"none","borderRadius":"30px",backgroundColor: "#1DC120",color: "white"}}>
          Join for Rs. 49
        </button>
      </div>
    </div>
  </div>
}

export default function CricketMatch() {
  const matches = [
    {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
    // {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"England","team2":"South Africa","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
  ]
  return (
    <>
      <Navbar selectedValue="cricket" />
      {/* <MatchCarousel type="contest-join"  matches={matches} /> */}
      <MatchCarousel matches={matches} />
      <div id='cricket-match'>
        <br />
        <h4 style={{ fontSize: "23px" }}>Upcoming contest</h4>
        <br />
        {contestTileMaker()}
      </div>
    </>
  )
}
