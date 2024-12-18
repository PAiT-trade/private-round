import { use } from "react";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // VERIFF
    VERIFF_API_KEY: process.env.VERIFF_API_KEY,
    VERIFF_API_SECRET: process.env.VERIFF_API_SECRET,
    WERT_PARTNER_ID: process.env.WERT_PARTNER_ID,
    // EMAIL
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    PAIT_ADDRESS: process.env.PAIT_ADDRESS,
    // POSTGRES
    POSTGRES_URL: process.env.POSTGRES_URL,
    // GOOGLE
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
    GOOGLE_TOKEN_URI: process.env.GOOGLE_TOKEN_URI,
    GOOGLE_AUTH_PROVIDER_X509_CERT_URL:
      process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // AWS S3
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    // ELLIPTIC
    ELLIPTIC_API_KEY: process.env.ELLIPTIC_API_KEY,
    ELLIPTIC_API_SECRET: process.env.ELLIPTIC_API_SECRET,
    ELLIPTIC_RISK_RATIO: process.env.ELLIPTIC_RISK_RATIO,
    // MAIL
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    ENVIROMENT_ID: process.env.ENVIROMENT_ID,
    API_URL: process.env.API_URL,
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /prisma\.cjs/,
      use: "null-loader",
      resolve: {
        fullySpecified: false,
      },
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

export default nextConfig;
