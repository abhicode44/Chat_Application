import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
        if (user) {
          setUserName(user.username);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    
    fetchUserName();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Welcome Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  text-align: center;
  padding: 2rem;

  img {
    height: 20rem;
    width: auto; // Maintain aspect ratio
    max-width: 100%; // Ensure image does not overflow container
  }

  h1 {
    font-size: 2rem;
    margin-top: 1rem;
    color: white;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 0.5rem;
    color: white;
  }

  span {
    color: blue;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 15rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    img {
      height: 10rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 0.9rem;
    }
  }
`;
