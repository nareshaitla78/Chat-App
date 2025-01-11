import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {resetPasswordRoute} from "../utils/APIRoutes";
const ResetPassword = () => {
  const { resetToken } = useParams();  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    else if(password.length<6){ 
      toast.error("Password should be atleast 6 characters long",{
        position:"top-center",
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      });
      return;
    }
    else if(confirmPassword.length<6){
      toast.error("Password should be atleast 6 characters long",{
        position:"top-center",
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
      });
      return;
    }
    else if(password==="" || confirmPassword===""){
      toast.error("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        resetPasswordRoute,
        { resetToken, password }
      );

      toast.success(response.data.message);
      if (response.data.status==true) {
        // navigate("/login");  
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleResetPassword}>
        <div className="brand">
          <h1>Reset Password</h1>
        </div>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      {/* ToastContainer for toast notifications */}
      <ToastContainer position="top-center" autoClose={5000} />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #131324;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #00000076;
    padding: 3rem 5rem;
    border-radius: 2rem;
    gap: 2rem;
    height: 60vh;
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h1 {
      color: #007bff;
      font-size: 2rem;
      text-transform: uppercase;
    }

    input {
      width: 100%;
      padding: 1rem;
      color: white;
      font-size: 1rem;
      background-color: transparent;
      border-radius: 5px;
      border: 0.1rem solid #4e0eff;
      &:focus {
        border: 1px solid #997ef0;
        outline: none;
      }
      margin: 10px 0;
    }

    button {
      padding: 1rem 2rem;
      border-radius: 5px;
      background-color: #997af0;
      color: white;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      border: 1px solid #ccc;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
  }
`;

export default ResetPassword;
