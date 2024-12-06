import { media } from "@/utils/media";
import { devices } from "./common";
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
        font-size: 65.5% ; // 1rem = 10px , 10px/16px = 62.5%
        @media only screen and  (max-width: ${devices.large}) {
            font-size: 50%;
        }
        ${media.largeDesktop(`
            font-size: 50%;
        `)}
    }   
    input,
    textarea,
    select{
        font-size: 14px;
    }
    body {
        font-family: ${({ theme }) => theme.fonts.main};
        font-weight: 400;
        letter-spacing: 0.5 !important;
        font-size: 14px;
        line-height: 1.6;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.primary};
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;

        ${media.mobile(`
            font-size: 14px;
        `)}

        ${media.tablet(`
            font-size: 14px;
        `)}

        ${media.desktop(`
            font-size: 16px;
        `)}
        ${media.largeDesktop(`
            font-size: 1px;
        `)}

    }
`;
