import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    fetchData();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && currentUserImage && (
        <Container>
          <div className="brand">
            <h3>ChatterBox</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  height: 100%;
  background-color: #080420;
  padding: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      color: #f4a261;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    gap: 0.75rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #444 #222;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #6c757d;
      border-radius: 5px;
    }

    .contact {
      background-color: #080420;
      min-height: 3rem;
      width: 100%;
      border-radius: 8px;
      padding: 0.75rem;
      display: flex;
      align-items: center;
      transition: background-color 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #495057;
      }

      .avatar img {
        height: 3rem;
        border-radius: 50%;
        border: 2px solid #adb5bd;
      }

      .username h3 {
        margin-left: 1rem;
        color: #f8f9fa;
        font-weight: 500;
      }
    }

    .selected {
      background-color: #6c63ff;
      box-shadow: 0 0 10px rgba(108, 99, 255, 0.5);
    }
  }

  .current-user {
    background-color: #cfd5e9;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;

    .avatar img {
      height: 3.5rem;
      border-radius: 50%;
      border: 3px solid #1f1f1f;
    }

    .username h2 {
      color: #1f1f1f;
      font-size: 1.8rem;
      font-weight: 600;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.05);
      z-index: 1;
      pointer-events: none;
    }

    .avatar,
    .username {
      z-index: 2;
    }
  }

  

 
  }
`;



