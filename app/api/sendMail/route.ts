// app/api/sendMail/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';



export async function POST(req :NextRequest){

const { name, email, message } = await req.json() ;

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false, // Use false for port 587 (STARTTLS)
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

const mailData = {
    from: {
        name: `${name}`,
        address: `${email}`,
    },
    replyTo: 'devbitnest@gmail.com',
    to: "devbitnest@gmail.com",
    subject: `form message`,
    text: message,
    html: `${message}`,
};

await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});
  console.log("sucess")
    return NextResponse.json({ success: true }, { status: 200 });
};
