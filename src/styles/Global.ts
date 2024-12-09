import { media } from "@/utils/media";
import { devices } from "./common";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
        font-weight: 200;
        font-family: ${({ theme }) => theme.fonts.family.main};
        letter-spacing: 0.5 !important;
        font-size: 14px;
        line-height: 1.6;
        letter-spacing: 0.1px;
        color: ${({ theme }) => theme.colors.text.normal};
        background-color: ${({ theme }) => theme.colors.primary};
        background-size: cover;
        background-repeat: no-repeat;
        /* min-height: 100vh; */
        max-width: 100%;
        min-height:100%;
        width: 100%;
        height:100%;
        @media (max-width: 768px) {
            font-size: 14px;
        }

        @media (max-width: 480px) {
            font-size: 12px;
        }
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
    }
   .connect-button{
        width:100% !important;
        height: 55px;
        background-color: #8cd2cf;
    }
`;
