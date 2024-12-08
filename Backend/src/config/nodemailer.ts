import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Nạp biến môi trường từ tệp .env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,  // Email của bạn
        pass: process.env.GMAIL_PASS,  // Mật khẩu ứng dụng của bạn
    },
});

// Hàm gửi email xác minh
export const sendVerificationEmail = async (userEmail: string, verificationToken: string) => {
    const verificationUrl = `http://localhost:4000/v1/auth/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.GMAIL_USER,  // Email người gửi
        to: userEmail,                 // Email người nhận
        subject: 'Email tạo tài khoản', // Chủ đề email
        text: `bạn hãy bấm vào dòng này để kích hoạt tài khoản của bạn : ${verificationUrl}`, // Nội dung email
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email: ', error); // Ghi log lỗi nếu có
    }
};

// Hàm gửi email khôi phục mật khẩu
export const sendPasswordResetEmail = async (userEmail: string, resetToken: string) => {
    const resetUrl = `http://localhost:3000/ResetPassword?token=${resetToken}`;

    const mailOptions = {
        from: process.env.GMAIL_USER,  // Email người gửi
        to: userEmail,                 // Email người nhận
        subject: 'Quên mật khẩu đăng nhập ', // Chủ đề email
        text: `Bấm vào ô này để tạo lại mật khẩu: ${resetUrl}`, // Nội dung email
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};
