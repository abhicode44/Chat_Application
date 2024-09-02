import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';


export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser && currentChat) {
        try {
          const response = await axios.post("https://chat-application-9sdd.onrender.com/api/messages/getmsg", {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [currentChat, currentUser]);

  // Listen for incoming messages - ensure the listener is only attached once
  useEffect(() => {
    if (socket.current) {
      const handleReceiveMessage = (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: false, message: msg },
        ]);
      };

      socket.current.on("msg-recieve", handleReceiveMessage);

      return () => {
        socket.current.off("msg-recieve", handleReceiveMessage);  // Clean up the listener
      };
    }
  }, [socket]);

  const handleSendMsg = async (msg) => {
    try {
      await axios.post("http://localhost:5000/api/messages/addmsg", {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      const newMessage = {
        fromSelf: true,
        message: msg,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      {currentChat && (
        <>
          <div className="chat-header">
            <div className="header-left">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.fromSelf ? "sended" : "received"}`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
            {/* Scroll marker */}
            <div ref={scrollRef} />
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: #080420;

    .header-left {
      display: flex;
      align-items: center;

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: white;
          margin-left: 1rem;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background-color: #0d0d30;

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;

        p {
          margin: 0;
        }
      }

      &.sended {
        justify-content: flex-end;

        .content {
          background-color: #4f04ff21;
        }
      }

      &.received {
        justify-content: flex-start;

        .content {
          background-color: #9900ff20;
        }
      }
    }
  }
`;
