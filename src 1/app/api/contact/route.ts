import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message } = body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL_TO;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey && contactEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "CBRG Website <noreply@cbrg.sust.edu>",
          to: [contactEmail],
          reply_to: email,
          subject: `[CBRG Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        }),
      });
    } catch {
      // Log server-side but don't expose to client
    }
  }

  return NextResponse.json({ success: true });
}
