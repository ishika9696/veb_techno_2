import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * Currently a mock handler — replace with Resend, SendGrid, or your preferred
 * email service by adding the API key and implementing the send logic.
 *
 * TODO: Add your email service API key to .env.local:
 *   RESEND_API_KEY=re_xxxxxxxxxxxxx
 *
 * TODO: Replace the mock response below with actual email sending:
 *   import { Resend } from 'resend';
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: 'Veb Techno <noreply@vebtechno.com>',
 *     to: ['hello@vebtechno.com'],
 *     subject: `New inquiry from ${data.name}`,
 *     html: `<p>Name: ${data.name}</p><p>Email: ${data.email}</p>...`,
 *   });
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* Validate with the same zod schema used on the client */
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    /* ── Mock handler ── */
    /* In production, send email via Resend / SendGrid / etc. here */
    console.log("📧 Contact form submission:", {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      service: data.service,
      budget: data.budget,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message received. We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
