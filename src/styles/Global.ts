import { media, sizes } from "@/utils/media";
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
        width: 100%;
        overflow-x: hidden !important;
        @media (max-width: ${sizes.desktop + "px"}) {
            overflow-x: hidden;
        }
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
        width: 100%;
        
        font-weight: 400;
        font-family: ${({ theme }) => theme.fonts.family.main};
        background-color: ${({ theme }) => theme.colors.bg};
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        letter-spacing: 0.5 !important;
        font-size: 14px;
        line-height: 1.6;
        letter-spacing: 0.1px;
        color: ${({ theme }) => theme.colors.text.normal};
        /* @media (max-width: ${sizes.desktop + "px"}) {
            overflow-x: hidden;
        } */
        overflow-x: hidden;

   
    }
    @media print {
        body {
            margin: 0;
            padding: 0;
            font-size: 15px;
            line-height: 1.6;
            font-family: Arial, sans-serif; 
        }

        .no-print {
            display: none; 
        }

        h1, h2, h3 {
            page-break-after: avoid; 
            color: black;
        }

        p {
            margin: 0.5em 0; 
            line-height: 1.5;
        }

        ul, ol {
            margin: 0 0 1em 2em;
        }

        h2 {
            page-break-after: always; 
        }

        footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10pt;
        }

        @media (max-width: 600px) {
            .print-section {
                width: 100%; 
                padding: 20px; 
            }
        }

        @page {
            margin: 20mm; /* Set margins for the printed page */
        }
    }
    .veriff-submit {
        width: 100%;
        background-color:#242d44 !important;
        color: #ffffffb3;
        box-sizing: border-box;
        text-transform: capitalize;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.005em;
        display: inline-block;
        text-align: center;
        user-select: none;
        border: 1px solid transparent;
        position: relative;
        height: 40px;
        padding: 0 16px;
        border-radius: 4px;
        transition-property: color, background-color, box-shadow;
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        user-select: none;
        box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0);
    }

    .veriff-description {
        color: #dce1ed !important;
        font-size: 12px;
        line-height: 16px;
        margin: 16px 0;
        text-align: center;
    }
    button.connect-button {
        background-color: red !important;
        width: 100% !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 0.5rem 1rem !important;
        border-radius: 6px;
        border: none !important;
        border: 1px solid #5cdfd8;
        background-color: #8cd2cf;
    }

    .dynamic-shadow-dom-content {
        width: 100%;
        height: 55px !important;

        .modal {
            min-width: 370px;
            height: 100%;
        }
    }
   .connect-button{
        width:100% !important;
        height: 55px;
        background-color: #8cd2cf;
    }
`;
