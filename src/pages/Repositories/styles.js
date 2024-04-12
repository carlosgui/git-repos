import { Link } from "react-router-dom";
import styled from "styled-components";

export const Loading = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #14213d;

  .text span {
    font-size: 60px;
    padding: 0 10px;
    text-transform: uppercase;
    color: #fff;
    animation: zoomup 2s linear infinite;
    animation-delay: calc(200ms * var(--i));
  }

  @keyframes zoomup {
    0%,
    100% {
      color: #00c2ba;
      filter: blur(1px);
      text-shadow: 0 0 10px #00c2ba, 0 0 20px #00c2ba, 0 0 30px #00c2ba,
        0 0 60px #00c2ba, 0 0 80px #00c2ba, 0 0 100px #00c2ba, 0 0 140px #00c2ba;
    }

    5%,
    95% {
      filter: blur(0);
      color: #fff;
      text-shadow: none;
    }
  }
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  padding: 20px;
  margin: 80px auto;
  color: black;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  img {
    border-radius: 100%;
    border: 1px solid #0d2636;
    margin-bottom: 10px;
    max-width: 40%;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    align-items: center;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      margin-left: 12px;

      strong {
        font-size: 15px;
        margin-bottom: 20px;

        a {
          text-decoration: none;
          color: #222;
          margin-right: 16px;

          &:hover {
            color: #0071db;
          }
        }
      }

      div {
        display: flex;
        flex-direction: row;
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: 0px;

        span {
          background: #222;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 5px 7px;
          margin-right: 8px;
        }
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    background-color: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    outline: 0;
    border: 0;
  }
  button:hover {
    background-color: #333;
    opacity: 0.8;
    transition: 0.4ms;

    &disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
`;
