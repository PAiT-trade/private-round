import { devices, pixelToViewPortWidth } from "./common";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    a  {
        text-decoration: none;
        color:  #fff !important;
        
    }
    html {
        box-sizing: border-box;
        font-size: 62.5% ; // 1rem = 10px , 10px/16px = 62.5%
        @media only screen and  (max-width: ${devices.large}) {
            font-size: 50%;
        }
    }   
    input,
    textarea,
    select{
        font-size: 16px;
    }
    body {
        font-family: ${({ theme }) => theme.fonts.main};
        font-weight: 400;
        line-height: 1.6;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.primary};
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;
    }
`;
