import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/aws";
import { sendEmail } from "@/lib/mail";
import { prisma } from "@/db/prisma";

const htmlEmail = (opts: {
  usdc_amount: number;
  name: string;
  pait_amount: number;
  link: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title></title>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!-- CSS Reset : BEGIN -->
    <!--[if true]>
    <style>
      table,td,p,a,span,h1,h2,h3 {font-family: Arial, sans-serif !important;}
      a {text-decoration: none;}
    </style>
    <![endif]-->
    <style>
      :root {
      color-scheme: light;
      supported-color-schemes: light;
      }
      html,
      body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      font-family:Arial,sans-serif;
      font-size:14px;
      }
      /* center email on Android 4.4 - margin reset */
      div[style*="margin: 16px 0"] {
      margin: 0 !important;
      }
      table,
      td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
      }
      table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
      mso-table-lspace: 0;
      mso-table-rspace: 0;
      }
      /* La poste hack*/
      h2,
      h3 {
      padding: 0;
      margin: 0;
      border: 0;
      background: none;
      }
    </style>
    <style>
      /* fix for Outlook links and visited links color */
      span.MsoHyperlink {
      color: inherit !important;
      mso-style-priority: 99 !important;
      }
      span.MsoHyperlinkFollowed {
      color: inherit !important;
      mso-style-priority: 99 !important;
      }
      /*  Apple Mail / iOS Mail apps */
      a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      }
      [x-apple-data-detectors-type="calendar-event"] {
      color: inherit !important;
      -webkit-text-decoration-color: inherit !important;
      text-decoration: none !important;
      }
      /*Gmail*/
      u+.body a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      }
      /*Samsung Mail*/
      #MessageViewBody a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
      }
    </style>
    <style>
      .cc-half {
      width: 100% !important;
      max-width: 50% !important;
      }
      .cc-one-third {
      width: 100% !important;
      max-width: 30% !important;
      }
      .cc-two-third {
      width: 100% !important;
      max-width: 70% !important;
      }
      .cc-fourth {
      width: 100% !important;
      max-width: 25% !important;
      }
      @media screen and (max-width:680px) {
      .cc-half,
      .cc-one-third,
      .cc-two-third,
      .cc-fourth {
      width: 100% !important;
      max-width: 680px !important;
      }
      }
    </style>
    <!--[if mso 12 | mso 14 | mso 15 | mso 16]>
    <style type="text/css">
      .list{margin-left:-27px}
    </style>
    <![endif]-->
  </head>
  <body style="margin: 0 auto !important; padding: 0 !important;background-color: #F2F2F2;">
    <div role="article" aria-roledescription="email" aria-label="email name" lang="en" dir="ltr" style="width: 100%;background-color: #F2F2F2;">
      <!--[if true]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F2F2F2;">
        <tr>
          <td>
            <![endif]-->
            <!-- Texte de pré-en-tête masqué visuellement : BEGIN -->
            <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: Arial,sans-serif;" aria-hidden="true">
              pre-header
            </div>
            <!-- Texte de pré-en-tête masqué visuellement : END -->
            <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">&#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
              &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
            </div>
            <div style="max-width: 680px; margin: 0 auto;background-color:#ffffff;" class="email-container">
              <!--[if true]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="680" role="presentation" style="background-color:#ffffff;">
                <tr>
                  <td align="center" valign="top">
                    <![endif]-->
                    <div style="padding:20px;">
                      <h1 style="margin:30px 0"> Dear ${name}</h1>
                    </div>
                    <!--[if true]>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px">
                    <![endif]-->
                    <div style="padding:20px;">
                      <p style="margin: 0 0 8px;">Thank you for your recent PAiT token purchase! We appreciate your trust and commitment to our vision. Our team is dedicated to ensuring a smooth experience, and we’re here to assist with any questions you may have. You can expect a response from us within two business days for any inquiries.

                      </p>
                      <p style="margin: 0 0 8px;text-transform:capitalize;"><strong>Purchase Summary</strong></p>
                      <p style="margin: 0 0 8px;">We’re pleased to confirm the details of your purchase:</p>
                      <p style="margin: 0;">Purchase Amount: ${opts.usdc_amount} USDC</p>
                      <p style="margin: 0;">Tokens Acquired: ${opts.pait_amount} $PAiT</p>
                      <p style="margin: 10px 0px">Please find the SAFT (Simple Agreement for Future Tokens) attached for your reference. This document confirms the details of your purchase and outlines the terms of our agreement.</p>
                    </div>
                    <div style="padding:20px;">
                     <p style="margin: 10px 0px">You will receive two emails from StreamFlow with vesting details between 6 PM and 9 PM UTC the following day. Afterward, you can view your contracts by connecting your wallet at streamflow.finance.</p>
                    </div>
                    <!--[if true]>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px">
                    <![endif]-->
                    <div style="padding:20px;">
                      <p style="margin: 0 0 8px;text-transform:capitalize;"><strong>Your Referral Link</strong></p>
                      <p style="margin: 0 0 8px;">We’re excited to offer you a unique opportunity to earn additional rewards through our referral program. Here is your personalized referral link:</p>
                      <p style="margin: 0 0 8px;"><a href="${opts.link}">${opts.link} </a></p>

                       <p style="margin: 10px 0px">
                       Feel free to share this link with friends, family, and colleagues who may be interested in joining our journey. By referring others, you not only help us grow our community but also earn potential rewards for each successful referral.</p>

                       <p style="margin: 10px 0px">Thank you once again for your support. We look forward to achieving great things together. <p/>
                    </div>
                    <!--[if true]>
                  </td>
                </tr>
                 <tr>
                  <td style="padding:20px">
                    <![endif]-->
                    <div style="padding:20px;">
                      <p style="margin: 0 0 8px;">Warm regards,</p>
                      <p style="margin: 0 0 8px;">Jonas Dovydaiti</p>
                      <p style="margin: 0 0 8px;">Co - Founder & CEO</p>
                      <p style="margin: 0 0 8px;">PAiT LAB LIMITED</p>
                      <p style="margin: 0 0 8px;">info@paitpresale.fi</p>
                    </div>
                    <!--[if true]>
                  </td>
                </tr>
               
                <tr>
                  <td style="padding:20px">
                    <![endif]-->
                    <div style="padding:20px; color:  #eee;">
                      <p style="margin:0">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.
                      </p>
                    </div>
                    <!--[if true]>
                  </td>
                </tr>
              </table>
              <![endif]-->
              </div>
              <!--[if true]>
          </td>
        </tr>
      </table>
      <![endif]-->
      </div>
      <!--[if true]></td></tr></table><![endif]-->
    </div>
  </body>
</html>`;
};

const buildHtml = (opts: {
  usdc_amount: number;
  name: string;
  pait_amount: number;
  link: string;
}) => {
  return `
        <p>Dear <strong>${opts.name}</strong>,</p>
        
        <p>Thank you for your recent PAiT token purchase! We appreciate your trust and commitment to our vision. Our team is dedicated to ensuring a smooth experience, and we’re here to assist with any questions you may have. You can expect a response from us within two business days for any inquiries.</p>

        <h3 style="color: #0066cc;">Purchase Summary</h3>
        <p>We’re pleased to confirm the details of your purchase:</p>

        <p><strong>Purchase Amount:</strong> ${opts.usdc_amount} USDC<br>
        <strong>Tokens Acquired:</strong> ${opts.pait_amount} $PAiT</p>

        <p>Please find the SAFT (Simple Agreement for Future Tokens) attached for your reference. This document confirms the details of your purchase and outlines the terms of our agreement.</p>

        <h3 style="color: #0066cc;">Your Referral Link</h3>
        <p><strong>We’re excited to offer you a unique opportunity to earn additional rewards through our referral program. Here is your personalized referral link:</strong></p>

        <p><a href="https://presale.pait.fi/?referral=${opts.link}">https://presale.pait.fi/?referral=${opts.link}</a></p>

        <p><strong>Feel free to share this link with friends, family, and colleagues who may be interested in joining our journey. By referring others, you not only help us grow our community but also earn potential rewards for each successful referral.</strong></p>

        <p>Thank you once again for your support. We look forward to achieving great things together.</p>

        <p>Warm regards,<br>
        Jonas Dovydaitis<br>
        Co-Founder & CEO<br>
        PAiT LAB LIMITED<br>
        info@paitpresale.fi</p>

        <p style="font-size: 0.9em; color: #666;">
          The content of this email is confidential and intended for the recipient specified in this message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.
        </p>
      `;
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const email = formData.get("email") as string;
    const pait_amount = Number(formData.get("pait_amount"));
    const usdc_amount = Number(formData.get("usdc_amount"));
    const telegram = formData.get("telegram") as string;
    const userId = Number(formData.get("userId") ? formData.get("userId") : 0);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    let url = "";
    let link = "";
    let name = "";

    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          telegram,
        },
      });

      link = user.referral;
      name = user.name!;
    } catch (error) {
      console.log("Updates purchase --- ");
    }

    try {
      let html = buildHtml({
        link,
        name,
        pait_amount,
        usdc_amount,
      });
      await sendEmail(
        email,
        "Your signed SAFT Agreement",
        "Hello, this is a test email!",
        html,
        file
      );

      /**
       * to: string,
  subject: string,
  text: string,
  html?: string,
  attachement?: File
       */
      console.log("Mail:");
    } catch (error) {
      console.log("UPLOAD: ", error);
    }
    return NextResponse.json({ status: "success", url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
