import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { UserModel } from '..//user/user.model';
import * as bcrypt from 'bcrypt';
import { randomStringGenerator } from 'src/utils/helper';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  transformUserData = async (data: any) => {
    const salt = await bcrypt.genSalt(12);
    data.password = await bcrypt.hash(data.password, salt);
    const { confirmPassword, ...userData } = data;

    userData.activationToken = randomStringGenerator(100);
    return userData;
  };
  //create user
  createUser = async (data: any) => {
    const user = await UserModel.create(data);
    return await user.save();
  };

  async sendActivationEmail(data: any) {
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
            `;
    await this.emailService.sendEmail({
      to: data.email,
      subject: 'Activation Email',
      html: emailTemplate,
    });
  }

  async sendWelcomeEmail(data: any) {
    const emailTemplate = `
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 0; min-height: 100vh; font-family: 'Segoe UI', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); padding: 40px 32px; text-align: center; position: relative; overflow: hidden;">
          <!-- Decorative elements -->
          <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: linear-gradient(45deg, #ff6b6b, #feca57); border-radius: 50%; opacity: 0.1;"></div>
          <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: linear-gradient(45deg, #48dbfb, #0abde3); border-radius: 50%; opacity: 0.1;"></div>
          
          <!-- Main content -->
          <div style="margin-bottom: 30px;">
            <h1 style="color: #2c3e50; font-size: 2.5em; margin-bottom: 10px; font-weight: 700; background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              🎉 Welcome to Our Platform! 🎉
            </h1>
            <p style="color: #7f8c8d; font-size: 1.2em; margin-bottom: 25px; line-height: 1.6;">
              We're thrilled to have you join our amazing community!
            </p>
          </div>

          <!-- Feature highlights -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 30px 0;">
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; border-radius: 15px; color: white;">
              <div style="font-size: 2em; margin-bottom: 10px;">🚀</div>
              <h3 style="margin: 0; font-size: 1.1em;">Fast & Secure</h3>
            </div>
            <div style="background: linear-gradient(135deg, #f093fb, #f5576c); padding: 20px; border-radius: 15px; color: white;">
              <div style="font-size: 2em; margin-bottom: 10px;">💎</div>
              <h3 style="margin: 0; font-size: 1.1em;">Premium Quality</h3>
            </div>
            <div style="background: linear-gradient(135deg, #4facfe, #00f2fe); padding: 20px; border-radius: 15px; color: white;">
              <div style="font-size: 2em; margin-bottom: 10px;">🌟</div>
              <h3 style="margin: 0; font-size: 1.1em;">24/7 Support</h3>
            </div>
          </div>

          <!-- Call to action -->
          <div style="margin-top: 35px;">
            <a href="#" style="display: inline-block; padding: 18px 36px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 1.1em; box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
              Start Exploring Now ✨
            </a>
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #ecf0f1;">
            <p style="color: #95a5a6; font-size: 0.9em; margin: 0;">
              Ready to discover amazing features? Let's make your journey extraordinary! 🌈
            </p>
          </div>
        </div>
      </div>
    `;
    await this.emailService.sendEmail({
      to: data.email,
      subject: 'Welcome Email',
      html: emailTemplate,
    });
  }

  register(data: any) {
    return {
      data: this.userService.getUserPublicProfile(data),
      message:
        "Thank you for registering. You're just one step away from activating your account and joining our vibrant community!",
      status: 'Success',
      options: null,
    };
  }
  async activationToken(user: any) {
    const userData = this.userService.getUserPublicProfile(user);
    return {
      data: userData,
      message: 'Successfully Activated',
      status: 'Success',
      options: null,
    };
  }

  me() {
    return {
      message: 'Auth',
    };
  }
  login(data: any) {
    return {
      data: data,
      message: 'Register Successfully',
      status: 'Success',
      options: null,
    };
  }
  logout() {
    return {
      
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
