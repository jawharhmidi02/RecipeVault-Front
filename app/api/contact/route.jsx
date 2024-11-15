import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  const receiver = process.env.NEXT_PUBLIC_GMAIL_USER;
  const username = process.env.NEXT_PUBLIC_GMAIL_USER;
  const password = process.env.NEXT_PUBLIC_GMAIL_PASS;

  console.log("Handling contact request");
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("telephone") || "N/A";
  const subject = formData.get("topic");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: receiver,
      subject: `RecipeVault Contact Request: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #2c3e50; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">

            <header style="background-color: #fbbf24; padding: 20px; text-align: center; color: #fff;">
              <h2 style="margin: 0; font-size: 24px;">New Contact Request</h2>
              <p style="font-size: 16px; margin: 5px 0;">You have received a message through RecipeVault</p>
            </header>

            <section style="padding: 20px;">
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Name:</strong> ${name}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Phone:</strong> ${phone}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>Subject:</strong> ${subject}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 20px 0 10px;">
                <strong>Message:</strong>
              </p>
              <div style="padding: 15px; background-color: #f1f1f1; border-left: 4px solid #fbbf24; font-size: 16px; line-height: 1.8;">
                ${message}
              </div>
            </section>

            <footer style="background-color: #fbbf24; padding: 15px; text-align: center; color: #fff;">
              <p style="margin: 0; font-size: 14px;">
                 RecipeVault
              </p>
            </footer>

          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Success: email sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.status(500).json({
      message: "Failed to send the message",
    });
  }
}
