import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenant_id, session_id, message } = body;

    if (!tenant_id || !session_id || !message) {
      return NextResponse.json(
        { error: "Missing required fields: tenant_id, session_id, message" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://groply.blockframe.cloud/api/widget/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenant_id,
          session_id,
          message,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Widget chat proxy error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to process chat message" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Widget chat proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}