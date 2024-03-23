import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
      margin-left: 0px;
    }
  }

  &span {
    color: ${(props) => (props.error ? "#FF0000" : "#000")};
    margin: 10px;
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  input {
    flex: 1;
    border: 1px solid ${(props) => (props.error ? "#FF0000" : "#ddd")};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//button animation
const buttonAnimate = keyframes`
from { 
    transform: rotate(0deg);
} to {
    transform: rotate(360deg);
}`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    opacity: 0.2;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${buttonAnimate} 2s linear infinite;
      }
    `}
`;

export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  margin-left: 10px;
  background: transparent;
  border: 0px;
  padding: 8px;
  outline: 0;
  border-radius: 5px;
`;
