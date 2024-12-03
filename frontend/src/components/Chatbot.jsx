import React, { useState, useEffect, useRef } from 'react'
import "../App.css"


const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL
const AUDIO_MODEL_URL = import.meta.env.VITE_AUDIO_MODEL_URL

export default function Chatbot() {
  const [chatOpen, setChatOpen] = useState(false);
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
        setChats((chats)=>[...chats, ["Sorry! Can you please rephrase your question?",false]]);
      } else {
        setChats((chats)=>[...chats, [res.response,false]]);
      }
      
      await fetch(AUDIO_MODEL_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "text": res.response,
        }),
      }).then(async (audio_res)=>{
        const audioBlob = await audio_res.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        // console.log(audioURL);
        // const audio = new Audio(audioURL);
        // audio.play();
        console.log("hello",chats);
        let updatedChats = chats;
        updatedChats[chats.length-1][1] = new Audio(audioURL);
        setChats(chats=>updatedChats);
      })
    });
  }
  console.log(chats);
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

  const openChatbot = () => {
    if (chatOpen==false) {
      document.getElementsByClassName("chatbot")[0].classList.add("chatbot-open");
      setChatOpen(true);
    }
  }

  const closeChatbot = () => {
    if (chatOpen) {
      document.getElementsByClassName("chatbot")[0].classList.remove("chatbot-open");
      setChatOpen(false);
    }
  }

  return (
    <div className='chatbot' onClick={()=>{openChatbot()}}>
      <img src="src/assets/chatbot.png" alt="" />
      <div className='chat-close' onClick={()=>{closeChatbot()}}>
        <img src="src/assets/close.png" alt="" width="15px" />
      </div>
      <div className='chats-container'>
        {
          chats.map((chat,index)=>{
            return (
              <div className='chatbot-chat' key={index} style={{display:"flex", justifyContent:index%2==1?"right":"left"}}>
                {
                  index%2==0 &&
                  <img id='chatbot-icon' src="src/assets/chatbot.png" alt=""/> 
                }
                <p style={{backgroundColor: index%2==1?"hsla(0, 82%, 30%, 1)":"inherit"}}>{chat[0]}</p>
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
        <button ref={chatSendRef} id='chat-send'>Send</button>
      </div>
    </div>
  )
}