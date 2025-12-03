import { NextRequest, NextResponse } from "next/server";

const CONVERTKIT_API_URL = "https://api.convertkit.com/v3";

interface SubscribeRequest {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SubscribeRequest = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const apiSecret = process.env.CONVERTKIT_API_SECRET;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiSecret || !formId) {
      console.error("ConvertKit credentials not configured");
      return NextResponse.json(
        { success: false, error: "Newsletter service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const convertkitResponse = await fetch(
      `${CONVERTKIT_API_URL}/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_secret: apiSecret,
          email: email,
          tags: ["IndustryLabs Website", "Newsletter Signup"],
        }),
      }
    );

    const convertkitData = await convertkitResponse.json();

    if (!convertkitResponse.ok) {
      console.error("ConvertKit API error:", convertkitData);

      if (convertkitData.message?.includes("already subscribed")) {
        return NextResponse.json(
          { success: false, error: "This email is already subscribed." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: "Failed to subscribe. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully subscribed! Check your email to confirm.",
        subscriberId: convertkitData.subscription?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscribe API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
