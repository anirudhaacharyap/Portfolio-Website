"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "Server configuration missing: RESEND_API_KEY is not set." };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "anirudhaacharyap@gmail.com",
      subject: `[PORTFOLIO TRANSMISSION] ${formData.subject || "No Subject"}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #0B0B0C; color: #E2E8F0; border: 1px solid #1A1A1C; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00FF66; border-bottom: 1px solid #1A1A1C; padding-bottom: 10px; margin-top: 0;">&gt; INCOMING_TRANSMISSION</h2>
          <p style="margin: 10px 0;"><strong>SENDER_IDENTITY:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>RETURN_ADDRESS:</strong> ${formData.email}</p>
          <p style="margin: 10px 0;"><strong>SUBJECT_HEADER:</strong> ${formData.subject}</p>
          <br />
          <div style="border-left: 2px solid #00FF66; padding-left: 15px; margin: 15px 0; color: #FFFFFF;">
            <p style="white-space: pre-wrap; margin: 0; font-family: monospace; font-size: 14px; line-height: 1.5;">${formData.message}</p>
          </div>
          <br />
          <p style="font-size: 10px; color: #666666; border-top: 1px solid #1A1A1C; padding-top: 10px; margin-bottom: 0;">SYSTEM_LOG // METADATA_VERIFIED // SECURE_API_ROUTING</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error?.message || "An unexpected transmission error occurred." };
  }
}
