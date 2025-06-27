import * as dotenv from 'dotenv';
dotenv.config();
export const SmtpConfig = {
    host: process.env.SMTP_HOST,
    provider: process.env.SMTP_PROVIDER,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
}