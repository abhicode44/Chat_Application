import React, { useState } from 'react';
import styled from 'styled-components';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  return (
    <Container>
      <div className="emoji-picker-container">
        <BsEmojiSmileFill className="emoji-icon" onClick={handleEmojiPickerHideShow} />
        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="send-button">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 0.5rem 1rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;

  .emoji-picker-container {
    position: relative;

    .emoji-icon {
      font-size: 2rem;
      color: yellow;
      cursor: pointer;
      padding-right: 0.5rem;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 1.25rem;
      }
    }

    .emoji-picker {
      position: absolute;
      bottom: 100%;
      left: 0;
      transform: translateY(-10px);
      z-index: 10;
      width: 350px; /* Default width */
      max-width: 100%; /* Ensure it doesn't exceed container width */
      
      @media (max-width: 768px) {
        width: 300px;
      }

      @media (max-width: 480px) {
        width: 250px;
      }

      .emoji-picker-react {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        background-color: #080420;
        border-color: #9a86f3;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }

        .emoji-categories button {
          filter: contrast(0);
        }

        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }

        .emoji-group:before {
          background-color: #080420;
        }

        /* Media Queries */
        @media (max-width: 768px) {
          .emoji-scroll-wrapper::-webkit-scrollbar {
            width: 4px;
          }

          .emoji-categories button {
            font-size: 0.8rem;
          }

          .emoji-search {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .emoji-scroll-wrapper::-webkit-scrollbar {
            width: 3px;
          }

          .emoji-categories button {
            font-size: 0.7rem;
          }

          .emoji-search {
            font-size: 0.7rem;
          }
        }
      }
    }
  }

  .input-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 3px;

    input {
      flex-grow: 1;
      border: none;
      font-size: 1rem;
      color: #333333;
      padding: 0.5rem;
      border-radius: 25px;
      outline: none;

      &::placeholder {
        color: #b0b0b0;
      }

      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 0.4rem;
      }

      @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.3rem;
      }
    }

    .send-button {
      background-color: transparent;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      margin-left: 0.5rem;
      cursor: pointer;

      svg {
        font-size: 1.5rem;
        color: #0a7cff;

        @media (max-width: 768px) {
          font-size: 1.25rem;
        }

        @media (max-width: 480px) {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default ChatInput;

