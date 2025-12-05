// File: /app/api/submit-form/route.ts
import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEETS_WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbya5aU8zXDeSmqLtzVJuCRrz8Crq5oxvWOc-BTCNQiNjKIE_SpjNVllPHWCixqx_yUY/exec";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { Name, Phone, Message } = body;

        // simple validation
        if (!Name || !Phone || !Message) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 }
            );
        }

        const formData = new URLSearchParams();
        formData.append("Name", Name);
        formData.append("Phone", Phone);
        formData.append("Message", Message);

        const response = await fetch(GOOGLE_SHEETS_WEBAPP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            // server responded with a non-2xx status
            const text = await response.text();
            console.error("Google Sheets WebApp returned bad status:", response.status, text);
            return NextResponse.json(
                { success: false, error: "Failed to submit to Google Sheets" },
                { status: 502 }
            );
        }

        const result = await response.json();

        if (result.result === "success") {
            return NextResponse.json(
                { success: true, message: "Form submitted successfully", data: result },
                { status: 200 }
            );
        } else {
            // handle error returned from Apps Script
            return NextResponse.json(
                { success: false, error: result.message || "Unknown error from sheet script", data: result },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
