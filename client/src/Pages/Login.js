import React from 'react';
import styled from 'styled-components';
import chat from '../assets/chat.jpg';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      try {
        const { data } = await axios.post("http://localhost:5000/api/auth/login", {
          username,
          password,
        });
        console.log("Login response:", data); // Debug log

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        } else if (data.status === true) {
          if (data.user && data.user.username) { // Check if data.user and data.user.username exist
            localStorage.setItem('chat-app-user', JSON.stringify(data.user));
            navigate("/");
          } else {
            toast.error("User data is missing.", toastOptions);
          }
        }
      } catch (error) {
        console.error('Error during login:', error); // Debug log
        toast.error("An error occurred. Please try again later.", toastOptions);
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="image-container">
          <img width={200} src={chat} alt='' />
          <h1>Login</h1>
        </div>
        <input
          className="input-form"
          type="text"
          placeholder="Username"
          name="username"
          min="3"
          onChange={(e) => handleChange(e)}
        />
        <input
          className="input-form"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button className="btn1" type="submit">
          Login
        </button>
        <span className="text-span">
          Don't have an account? <Link to="/register">Create One.</Link>
        </span>
      </form>
      <ToastContainer />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;

  form {
    padding: 1.2rem;
    border-radius: 0.5rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 30%; /* Default width */
    box-shadow: 0px 4px 8px rgba(78, 14, 255, 0.9);

    @media (max-width: 768px) {
      width: 50%; /* Adjust form width for tablets */
    }

    @media (max-width: 480px) {
      width: 80%; /* Adjust form width for mobile devices */
      padding: 1rem; /* Reduce padding for smaller screens */
    }
  }

  .image-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    img {
      width: 150px;
      height: auto;

      @media (max-width: 480px) {
        width: 100px; /* Reduce image size on smaller screens */
      }
    }
  }

  .input-form {
    background-color: transparent;
    padding: 0.8rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: black;

    &:focus {
      border: 0.1rem solid #632cee48;
      outline: none;
      background-color: azure;
    }
  }

  .btn1 {
    background-color: #00004b;
    width: 100%; /* Make button width 100% of the form */
    padding: 1rem;
    border-radius: 0.4rem;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;

    @media (max-width: 480px) {
      padding: 0.75rem; /* Reduce padding for smaller screens */
    }
  }

  .text-span {
    font-size: 1rem;
    padding-top: 1rem;
    color: black;
    text-align: center;
  }
`;

export default Login;
