import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

// Simple in-memory rate limit map
const RATE_LIMIT_MAP = new Map<string, { count: number; lastTime: number }>();

export async function POST(request: Request) {
    try {
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();

        // 1. Rate Limiting (5 req per 60s)
        const rateData = RATE_LIMIT_MAP.get(ip) || { count: 0, lastTime: now };

        if (now - rateData.lastTime > 60000) {
            rateData.count = 0;
            rateData.lastTime = now;
        }

        if (rateData.count >= 5) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }

        rateData.count++;
        RATE_LIMIT_MAP.set(ip, rateData);

        const body = await request.json();

        // 2. Honeypot Check
        if (body.company && typeof body.company === 'string' && body.company.length > 0) {
            return NextResponse.json({ error: "Spam detected" }, { status: 400 });
        }

        // 3. Validation & Sanitization
        let { name, email, message } = body;

        // Type checks
        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return NextResponse.json({ error: "Invalid data types" }, { status: 400 });
        }

        // Sanitize
        name = name.trim();
        email = email.trim();
        message = message.trim();

        // Length checks
        if (!name || name.length > 80) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
        if (!email || email.length > 120 || !email.includes('@')) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        if (!message || message.length > 2000) return NextResponse.json({ error: "Invalid message" }, { status: 400 });

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'akanksha@rhonerobotics.com',
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email as string,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (data.error) {
            return NextResponse.json(
                { error: data.error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
