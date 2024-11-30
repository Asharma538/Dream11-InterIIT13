import React from 'react'
import MatchCarousel from '../components/MatchCarousel'
import Navbar from '../components/Navbar'

export default function CricketMatchContest() {
    const matches = [
        {"match":"Men's T20I Tri-Series ","time":"01:00 PM","team1":"India","team2":"Australia","date":"2021-12-27","team1Image":"src/assets/india_team.png","team2Image":"src/assets/aus_team.png"},
    ]
    const [selectedTab, setSelectedTab] = React.useState("prizes");
    const changeSelectedTab = (tab) => {
        setSelectedTab(tab);
    }
  return (
    <>
    <Navbar selectedValue="cricket"/>
    <MatchCarousel type="contest-prize" matches={matches} />
    <div id='cricket-match-details-info'>
            <div>Want to reduce the entry fee?</div>
            <div>
            Play the <b><u>FANTASY QUIZ</u></b> and redeem <b>Dream Coins.</b>
            </div>
        </div>
      
    <div id='cricket-match-contests'>
      <br />
      <h4 style={{ fontSize: "23px" }}>Select a contest to join</h4>
      <br />
      <div id='cricket-match-contest-both-cards'>
        <div className='cricket-match-contest-card'>
          <h3>Prize Pool: <b>Rs. 14 crore</b></h3>
          <br />
          <hr />
          <br />
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
              <div>Prize: Rs. 1 crore</div>
              <div>Winners: 66%</div>
            </div>
            <button style={{"padding":"10px","border":"none","borderRadius":"30px",backgroundColor: "#1DC120",color: "white"}}>
              Join for Rs. 49 Only
            </button>
          </div>
        </div>
        <div className='cricket-match-contest-card'>
        <h3>Quiz</h3>
          <br />
          <hr />
          <br />
          <div style={{ border: "1px solid black", display: 'flex' }}>
            <div style={{ backgroundColor: "#AD1E1E", height: "3px", width: "50%" }}></div>
            <div style={{ backgroundColor: "white", height: "3px", width: "auto" }}></div>
          </div>
          <div style={{ height: "4px" }}></div>
          <div style={{ color: "gray", display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <div>Played by: 1,23,123</div>
            <div>Registered by: 2,00,000</div>
          </div>
          <br /><br />
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
              <div>Prize: 10 Dream Coins</div>
              <div>Winners: 30%</div>
            </div>
            <button style={{"padding":"10px","border":"none","borderRadius":"30px",backgroundColor: "#1DC120",color: "white"}}>
              Attempt Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div id='cricket-match-contest-details-tabs'>
          <div className='cricket-match-contest-details-tab' onClick={()=>changeSelectedTab("prizes")} style={{backgroundColor: selectedTab=="prizes"?"red":"inherit"}}>Prizes</div>
          <div className='cricket-match-contest-details-tab' onClick={()=>changeSelectedTab("winners")} style={{backgroundColor: selectedTab=="winners"?"red":"inherit"}}>Winners</div>
          <div className='cricket-match-contest-details-tab' onClick={()=>changeSelectedTab("rules")} style={{backgroundColor: selectedTab=="rules"?"red":"inherit"}}>Rules</div>
      </div>
      <div id='cricket-match-contest-table'>
        <table>
            <tr>
                <th>Rank</th>
                <th>Winnings</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Rs. 1 Crore</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Rs. 50 Lakh</td>
            </tr>
        </table>
      </div>
      <div style={{"height":"40px"}}></div>
    </div>
    </>
  )
}
