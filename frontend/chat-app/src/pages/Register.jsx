import React, {useState,useEffect} from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from "../utils/APIRoutes";
function Register() {
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
   const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            console.log("Form submitted successfully");
            const {username,email,password,confirmPassword} = values;
            const {data}=await axios.post(registerRoute,{username,email,password});
        }
    }
    const handleValidation = () => {
        const {username,email,password,confirmPassword} = values;
        if(password !== confirmPassword){
            toast.error("password and confirm password should be same.",{
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
            });
            return false;
        }
        else if(username === ""){
            toast.error("Username is  required.",{
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
            });
            return false;
        }
        else if(email === ""){
            toast.error("Email is  required.",{
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
            });
            return false;
        }
        else if (password.length < 6){
            toast.error("Password should be atleast 6 characters long.",{
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
            });
            return false;
        }
        else if(username.length < 3){
            toast.error("Username should be greater than 3 characters.",{
                position:"bottom-right",
                autoClose:8000,
                pauseOnHover:true,
                draggable:true,
                theme:"dark"
            });
            return false;
        }
        // else{
        //     toast.success("User created successfully.",{
        //         position:"top-right",
        //         autoClose:8000,
        //         pauseOnHover:true,
        //         draggable:true,
        //         theme:"dark",
        //         color:"green"
        //     });
        //     return true;
        // }
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    };
    return ( 
    <>
    
    <FormContainer>
        <form onSubmit={event=>handleSubmit(event)}>
        <div className="brand">
            <h1>HuntFor</h1>
        </div>
        <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}/>
        <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)}/>
        <button type="submit">Create User</button>
        <span>Already have an Account ? <Link to ="/login" >Login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>);
    }
const FormContainer = styled.div`
    display: flex;  
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 100vh;
    width: 100vw;
    background-color: #131324;
    form{
    height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 2rem;
        align-items: center;
        gap:2rem;
        background-color: #00000076;
        padding: 3rem 5rem;
        .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        }
        input{
        background-color: transparent;
            width: 100%;
            padding: 1rem;
            color: white;
            font-size: 1rem;
            &:focus{
                border: 1px solid #997ef0;
                outline: none;
            }
            margin: 10px;
            border-radius: 5px;
            border: 0.1rem solid #4e0eff;
            &:hover{
                border-color: #007BFF;
            }
            }
            h1{
            color: #007BFF;
            font-size: 2rem;
            text-transform: uppercase;
            
            }
        button{
            padding: 1rem 2rem;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #997af0;
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
            }
        }
            span{
            color: white;
            text-transform: uppercase;
            a{
                color:  #4e0eff;
                text-decoration: none;
                text-transform: uppercase;
                &:hover{
                    color: #007BFF;
                }
            }
    `;
export default Register;