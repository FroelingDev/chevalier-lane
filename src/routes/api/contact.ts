import { createServerFileRoute } from "@tanstack/react-start/server";
import { getResendClient } from "@/lib/resend";

export const ServerRoute = createServerFileRoute("/api/contact").methods({
  POST: async ({ request }) => {
    const resend = getResendClient();
    if (!resend) {
      return new Response(JSON.stringify({ error: "Resend API key missing" }), {
        status: 500,
      });
    }

    const { name, email, phone, subject, message } = await request.json();

    const { error } = await resend.emails.send({
      from: "Chevalier Lane <no-reply@updates.chevalierlane.com>",
      to: ["info@chevalierlane.com"],
      subject: "New Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Subject: ${subject}</p>
             <p>Message: ${message}</p>`,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 },
    );
  },
});
