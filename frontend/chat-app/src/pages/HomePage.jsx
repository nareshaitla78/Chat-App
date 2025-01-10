import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <HomeContainer>
      <div className="content">
        <h1>Welcome to HuntFor!</h1>
        <p>Join us to explore and connect with the world.</p>
        {/* <div className="buttons">
          <Link to="/register" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div> */}
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #131324;
  color: white;

  .content {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 2rem 4rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #007bff;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #d1d1d1;
    }

    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;

      .btn {
        text-decoration: none;
        color: white;
        font-weight: bold;
        padding: 0.8rem 2rem;
        background-color: #4e0eff;
        border-radius: 5px;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #007bff;
        }
      }
    }
  }
`;

export default Home;
