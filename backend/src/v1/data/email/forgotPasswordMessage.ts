import { SendMailOptions } from "nodemailer";

export const forgotPasswordMessage = (code: string): SendMailOptions => {
  return {
    subject: 'Recover password',
    html: `
      <h1 style="color: brown; font-family: 'Courier New', Courier, monospace;">Hello world</h1>
      <img src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="Image">
      <p style="font-size: 24px; color: rgb(18, 128, 224);">Code for updating password <b>${code}</b></p>
    `,
  }
};