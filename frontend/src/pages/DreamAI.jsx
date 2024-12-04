import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'

const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL
const AUDIO_MODEL_URL = import.meta.env.VITE_AUDIO_MODEL_URL

export default function DreamAI() {
  const [chats, setChats] = useState([["Hello! How can I help you today?",true]]);

  async function getResponse(msg) {
    await fetch(CHATBOT_URL, {
      method: "POST",
      body: JSON.stringify({
        model: "phi3:14b",
        prompt: "I'll ask questions related to cricket. \
                Please keep the conversation to the point. \
                If you don't get my question please ask again. \
                Give good concize and clear response.\
                Don't give anything unnecessary information in response that is not related to my query.\
                Always limit the response to a maximum of 50 words\
                Here's my prompt: "+msg,
        stream: false,
      }),
      headers: {
        "Content-type": "text/plain",
      },
    })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.response==""){
        // updatedChats.push(["Sorry! Can you please rephrase your question?",false]);
        // console.log("updated chats are ",updatedChats);
        setChats((chats)=>[...chats, ["Sorry! Can you please rephrase your question?",false]]);
      } else {
        // updatedChats.push([res.response,true]);
        // console.log("updated chats are ",updatedChats);
        setChats((chats)=>[...chats, [res.response,false]]);
      }
      
      await fetch(AUDIO_MODEL_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "text": res.response==""?"Sorry! Can you please rephrase your question?":res.response,
        }),
      }).then(async (audio_res)=>{
        const audioBlob = await audio_res.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        // console.log(audioURL);
        const audio = new Audio(audioURL);
        // audio.play();
        // console.log("hello",chats);
        // let updatedChats = chats;
        // updatedChats[chats.length-1][1] = new Audio(audioURL);

        setChats(chats=>[...chats.slice(0,chats.length-1),[chats[chats.length-1][0],audio]]);
        console.log(chats);
      })
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const chatTextRef = useRef(null)
  const chatSendRef = useRef(null)

  useEffect(() => {
    chatTextRef.current.addEventListener("keydown", async function(event) {
      if (event.key === "Enter") {
        const message = chatTextRef.current.value;
        chatTextRef.current.value = "";
        setChats((chats)=>[...chats, [message]]);
        await getResponse(message);
      }
    })

    chatSendRef.current.addEventListener("click", async function(event) {
      const message = chatTextRef.current.value;
      chatTextRef.current.value = "";
      setChats((chats)=>[...chats, [message]]);
      await getResponse(message);
    })
  }, []);


  return (
    <div>
      <Navbar selectedValue='none' />
      <div id="dream-ai-chatbot">
        <div id='dream-ai-chatbot-chats-container'>
          {
            chats.map((chat,index)=>{
              return (
                <div className='chatbot-chat' key={index} style={{display:"flex", justifyContent:index%2==1?"right":"left"}}>
                  {
                    index%2==0 &&
                    <img id='chatbot-icon' src="src/assets/chatbot.png" alt=""/> 
                  }
                  <p style={{backgroundColor: index%2==1?"hsla(0, 82%, 30%, 1)":"inherit"}} className={index==0?"first-chat":""}>{chat[0]}</p>
                  {
                    chat[1] &&
                    <img id='chat-speaker' src='src/assets/speaker.png' alt='' onClick={
                      ()=>{
                        console.log(chat);
                        chat[1].play();
                      }
                    }/>
                  }
                </div>
              )
            })
          }
        </div>
        <div className='chat-input'>
          <input ref={chatTextRef} id='chat-text' type="text" placeholder="Type your message here" />
          <button ref={chatSendRef} id='chat-send'>
            <img src="src/assets/send-button.png" alt="" width='40px' />
          </button>
        </div>
      </div>
    </div>
  )
}