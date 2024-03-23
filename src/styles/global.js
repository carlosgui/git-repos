import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0 auto;
        padding: 0 auto;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
    }

    body {
        background: #0D2636;
        font-size: 14px;
        -webkit-font-smoothing: antialiased !important
    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    Button {
        cursor: pointer;
    }
`;