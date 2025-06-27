import { Injectable } from '@nestjs/common';
import { SmtpConfig } from 'src/common/config';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {

    constructor(private readonly emailService: EmailService){}
    async sendActivationEmail(data: any){
        const emailTemplate = ` 
                <div style="background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); padding: 40px 0; min-height: 100vh; font-family: 'Segoe UI', Arial, sans-serif;">
                  <div style="max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.15); padding: 32px 24px; text-align: center;">
                    <h1 style="color: #ff6f61; margin-bottom: 8px; letter-spacing: 1px;">Welcome to <span style='color:#36d1c4;'>Ecommerce!</span></h1>
                    <p style="color: #333; font-size: 18px; margin-bottom: 24px;">Thank you for registering. You're just one step away from activating your account and joining our vibrant community!</p>
                    <a href="http://localhost:3000/auth/activate/${data.activationToken}"
                      style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%); color: #fff; font-size: 20px; font-weight: bold; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 12px rgba(54,209,196,0.15); margin-bottom: 20px; transition: background 0.3s;">
                      Activate My Account
                    </a>
                    <p style="color: #888; font-size: 15px; margin: 24px 0 0 0;">If the button above doesn't work, copy and paste the following link into your browser:</p>
                    <p style="word-break: break-all; color: #5b86e5; font-size: 15px; margin: 8px 0 0 0;">
                      http://localhost:3000/auth/activate/${data.activationToken}
                    </p>
                    <hr style="margin: 32px 0; border: none; border-top: 2px dashed #fda085;">
                    <p style="color: #ff6f61; font-size: 16px;">Need help? <span style='color:#36d1c4;'>Contact our support team anytime!</span></p>
                  </div>
                </div>
            `
        await this.emailService.sendEmail({
            to: data.email,
            subject: "Activation Email",
            html: emailTemplate,
        });
    }

    register(data: any) {

        return {
           data : data,
           message : "Register Successfully",
           status : "Success",
           options : null,
        };
    }
    activationToken() {
        return {
            message: 'activationToken',
        };
    }
    me() {
        return {
            message: 'Auth',
        };
    }
    login(data:any) {
        return {
            data : data,
           message : "Register Successfully",
           status : "Success",
           options : null,
        };
    }
    logout() {
        return {
            message: 'Auth',
        };
    }
    forgetPassword() {  
        return {
            message: 'Auth',
        };
    }
    forgetPasswordToken() {
        return {
            message: 'Auth',
        };
    }
    resetPassword() {
        return {
            message: 'Auth',
        };
    }
    changePassword() {
        return {
            message: 'Auth',
        };
    }
    updateUserById() {
        return {
            message: 'Auth',
        };
    }
}
