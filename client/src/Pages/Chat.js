import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contacts from "../Components/Contacts";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import io from "socket.io-client";

export default function Chat() {
  const host = "https://chat-application-plew.onrender.com";
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
        setIsLoaded(true);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(
            `https://chat-application-plew.onrender.com/api/auth/allusers/${currentUser._id}`
          );
          setContacts(data);
        } else {
          navigate("/Avatar");
        }
      }
    };
    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f7ff;
  padding: 1rem;

  .container {
    height: 100%;
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    background-color: #080420;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 1);
    border-radius: 12px;
    overflow: hidden;
    gap: 1rem;
    grid-template-rows: auto 1fr; // Adjust rows for better flexibility
  }

 
`;


