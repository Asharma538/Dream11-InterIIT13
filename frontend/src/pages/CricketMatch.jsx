import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

function contestTileMaker(contestDetails,index,functionToCall) {
  return <div className='cricket-match-card' key={index}>
      <h3>Prize Pool: <b> {contestDetails.prizePool} </b></h3>
      <br /><hr /><br />
      <div style={{ border: "1px solid black", display: 'flex' }}>
        <div style={{ backgroundColor: "#AD1E1E", height: "3px", width: "50%" }}></div>
        <div style={{ backgroundColor: "white", height: "3px", width: "auto" }}></div>
      </div>
      <div style={{ height: "4px" }}></div>
      <div style={{ color: "gray", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
        <div>{contestDetails.spotsLeft} left</div>
        <div>{contestDetails.totalSpots} spots</div>
      </div>
      <br /><br />
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <div> Prize: <b>{contestDetails.prize}</b> </div>
          <div> Winners: <b>{contestDetails.winners}</b></div>
        </div>
        <button onClick={functionToCall[index]} style={{"padding":"10px 20px","border":"none","borderRadius":"30px",backgroundColor: "#1DC120",color: "white","cursor":"pointer"}}>
          Join for Rs. {contestDetails.price}
        </button>
      </div>
    </div>
}

export default function CricketMatch() {
  const navigate = useNavigate();
  const matches = [
    {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"}
  ]
  const contests = [
    {prizePool: "Rs. 14 crore", spotsLeft: "32,12,123", totalSpots: "64,24,246", prize: "Rs. 3 crore", winners: "66%", price: "99"},
    {prizePool: "Rs. 10 crore", spotsLeft: "12,12,123", totalSpots: "34,24,246", prize: "Rs. 2 crore", winners: "50%", price: "49"},
    {prizePool: "Rs. 8 crore", spotsLeft: "22,12,123", totalSpots: "44,24,246", prize: "Rs. 1 crore", winners: "44%", price: "29"},
    {prizePool: "Rs. 6 crore", spotsLeft: "42,12,123", totalSpots: "54,24,246", prize: "Rs. 50 lakh", winners: "33%", price: "19"},
    {prizePool: "Rs. 4 crore", spotsLeft: "52,12,123", totalSpots: "64,24,246", prize: "Rs. 25 lakh", winners: "22%", price: "9"},
    {prizePool: "Rs. 2 crore", spotsLeft: "62,12,123", totalSpots: "74,24,246", prize: "Rs. 10 lakh", winners: "11%", price: "5"},
  ]

  const handleJoinContest = () => {
    navigate("/cricket-match-contest");
  }
  const functionToCall = [
    ()=>handleJoinContest(),
    ()=>{},
    ()=>{},
    ()=>{},
    ()=>{},
    ()=>{}
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
        <div className='cricket-match-contests'>
          {
            contests.map((contestDetails,index) => contestTileMaker(contestDetails,index,functionToCall))
          }
        </div>
      </div>
    </>
  )
}
