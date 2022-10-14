
import io from 'Socket.IO-client'
import { useState, useEffect } from "react";

let socket


export default function Home() {

  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => socketInitializer(), [])

  useEffect(() => {
    socketInitializer();
  }, []);


  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  return (
    <div>

      <body>
        <ul id="messages"></ul>
        <form id="form" action="">
          <input id="input" autoComplete="off" value={input} onChange={onChangeHandler} /><button>Send</button>
        </form>
      </body>
    </div>
  )
}
