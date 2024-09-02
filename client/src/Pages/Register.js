import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import chat from "../assets/chat.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register() {

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
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmpassword, username, email } = values;
      const { data } = await axios.post("https://chat-application-plew.onrender.com/api/auth/register", {
        username, email, password, confirmpassword
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        toast.success("User Created successfully", toastOptions);
        setTimeout(() => {
          navigate('/login'); // Redirect after the toast message
        }, 5000);
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmpassword, username, email } = values;
    if (password !== confirmpassword) {
      toast.error(
        "Password and confirm password should be the same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="image-container">
          <img src={chat} alt='Chat' />
          <h1>Registration</h1>
        </div>

        <input
          className="input-form"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="input-form"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="input-form"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          className="input-form"
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          onChange={handleChange}
        />

        <button className="btn1" type="submit">
          Create User
        </button>
        <span className="text-span">
          Already have an account? <Link to="/">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  

  form {
    padding: 1.2rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0px 4px 8px rgba(0, 0, 255, 0.9);

    .image-container {
      display: flex;
       flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 1rem;

      img {
        width: 150px;
        height: auto;
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
      color: #000;

      &:focus {
        border: 0.1rem solid #632cee48;
        outline: none;
        background-color: azure;
      }
    }

    .btn1 {
      background-color: #00004b;
      width: 100%;
      padding: 1rem;
      border-radius: 0.4rem;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      text-align: center;
    }

    .text-span {
      font-size: 1.2rem;
      padding-top: 1rem;
      color: black;
    }
  }
`;

export default Register;
