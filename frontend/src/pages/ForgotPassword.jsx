import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { forgotPasswordRoute } from "../utils/APIRoutes";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(forgotPasswordRoute, { email });
            if (data.status === true) {
                toast.success(data.message, { theme: "dark" });
            } else {
                toast.error(data.message, { theme: "dark" });
            }
        } catch (error) {
            console.log(error,"error");
            toast.error("Something went wrong. Try again later.", { theme: "dark" });
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                <input
                    type="email"
                    placeholder="Enter your registered email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Send Reset Link</button>
            </form>
            <ToastContainer />
        </FormContainer>
    );
}

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
        gap: 1rem;
        padding: 2rem;
        background-color: #00000076;
        border-radius: 1rem;
        input {
            padding: 1rem;
            border-radius: 0.5rem;
            border: 0.1rem solid #4e0eff;
            color: white;
            background-color: transparent;
        }
        button {
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            background-color: #4e0eff;
            color: white;
            cursor: pointer;
        }
        h1 {
            color: white;
        }
    }
`;

export default ForgotPassword;
