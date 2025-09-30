import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact form emails for:", { name, email, company });

    // Send notification email to business owner using Resend API
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dennic Engineering <onboarding@resend.dev>",
        to: ["your-email@example.com"], // Replace with your actual email
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><em>Sent via Dennic Engineering contact form</em></p>
        `,
      }),
    });

    if (!ownerEmailResponse.ok) {
      throw new Error(`Failed to send owner email: ${await ownerEmailResponse.text()}`);
    }

    const ownerEmail = await ownerEmailResponse.json();
    console.log("Owner notification sent:", ownerEmail);

    // Send confirmation email to user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dennic Engineering <onboarding@resend.dev>",
        to: [email],
        subject: "We received your message!",
        html: `
          <h1>Thank you for contacting us, ${name}!</h1>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
          <br>
          <p>Best regards,<br>The Dennic Engineering Team</p>
        `,
      }),
    });

    if (!userEmailResponse.ok) {
      throw new Error(`Failed to send user email: ${await userEmailResponse.text()}`);
    }

    const userEmail = await userEmailResponse.json();
    console.log("User confirmation sent:", userEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ownerEmail, 
        userEmail 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
