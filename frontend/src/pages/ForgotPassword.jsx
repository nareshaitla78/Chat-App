import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { forgotPasswordRoute } from "../utils/APIRoutes";
import {useNavigate} from "react-router-dom";
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp,setOtp]=useState("");
    const [otpValue,setOtpValue]=useState("");
    const [showPopup,setShowPopup]=useState(false);
    const navigate=useNavigate();
    const digits="0123456789";
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let otp="";
            for(let i=0;i<6;i++){
                otp+= digits[Math.floor(Math.random()*10)];
            }
            setOtp(otp);
            console.log(otp);
            const { data } = await axios.post(forgotPasswordRoute, { email,otp });
            if (data.status === true) {
                // setOtpValue(otp);
                setShowPopup(true);
                toast.success(data.message, { theme: "dark" });
            } else {
                toast.error(data.message, { theme: "dark" });
            }
        } catch (error) {
            console.log(error,"error");
            toast.error("Something went wrong. Try again later.", { theme: "dark" });
        }
    };
    const checkOtp= () =>{
        if(otpValue==otp){
            navigate("/reset-password");
            setShowPopup(false);
            toast.success("OTP Verified",{theme:"dark"});
        }
        else{
            toast.error("Invalid OTP",{theme:"dark"});
        }
}

    return (
        <>
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
        <ShowPopupContainer>
            {showPopup && ( 
                <div className="popup">
                    <div className="popup-content">
                        <h1>Enter OTP</h1>
                        <p>Enter the 6-digit code sent to your Email.</p>
                        <input 
                            type="text" 
                            placeholder="Enter OTP"
                            value={otpValue} 
                            onChange={(e) => setOtpValue(e.target.value)} 
                        />
                        <button onClick={checkOtp}>Submit</button>
                    </div>
                </div>
            )}


        </ShowPopupContainer>
        
        
        </>
        
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
const ShowPopupContainer = styled.div`  
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #131324;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .popup-content {
        background-color: #000000;
        padding: 2rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 300px;
        input {
            padding: 1rem;
            border-radius: 0.5rem;
            border: 0.1rem solid #4e0eff;
            color: white;
            background-color: #131324;
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
            text-align: center;
        }
        p {
            color: #b3b3b3;
            text-align: center;
        }
    }
`;



export default ForgotPassword;
