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
        let { name, email, phone, photoshopSkill, device, portfolioLink, motivation } = body;

        // Type checks (required fields)
        if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string' ||
            typeof photoshopSkill !== 'string' || typeof device !== 'string') {
            return NextResponse.json({ error: "Invalid data types" }, { status: 400 });
        }

        // Sanitize required
        name = name.trim();
        email = email.trim();
        phone = phone.trim();
        photoshopSkill = photoshopSkill.trim();
        device = device.trim();

        // Sanitize optional
        if (typeof portfolioLink === 'string') portfolioLink = portfolioLink.trim();
        else portfolioLink = '';

        if (typeof motivation === 'string') motivation = motivation.trim();
        else motivation = '';

        // Length & Format checks
        if (!name || name.length > 80) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
        if (!email || email.length > 120 || !email.includes('@')) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        if (!phone || phone.length > 20) return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
        if (!photoshopSkill || photoshopSkill.length > 50) return NextResponse.json({ error: "Invalid skill" }, { status: 400 });
        if (!device || device.length > 50) return NextResponse.json({ error: "Invalid device" }, { status: 400 });

        if (portfolioLink.length > 300) return NextResponse.json({ error: "Portfolio link too long" }, { status: 400 });
        if (motivation.length > 2000) return NextResponse.json({ error: "Motivation too long" }, { status: 400 });

        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'akanksha@rhonerobotics.com',
            subject: `New Trainee Application from ${name}`,
            replyTo: email,
            html: `
                <h2>New Trainee Application</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Photoshop Skill:</strong> ${photoshopSkill}</p>
                <p><strong>Device:</strong> ${device}</p>
                <p><strong>Portfolio:</strong> ${portfolioLink || 'N/A'}</p>
                <p><strong>Motivation:</strong></p>
                <p>${motivation || 'N/A'}</p>
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
        console.error('Trainee application error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
