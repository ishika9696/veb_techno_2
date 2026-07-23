import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/admin-validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      console.log("[LOGIN DEBUG] Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password.trim();

    console.log(`[LOGIN DEBUG] Searching for user with email: "${email}"`);
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    console.log(`[LOGIN DEBUG] User found: ${!!user}`);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const validPassword = await verifyPassword(password, user.hashedPassword);
    console.log(`[LOGIN DEBUG] Password valid: ${validPassword}`);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    await createSession(user.id, user.email);
    console.log(`[LOGIN DEBUG] Session created successfully for ${user.email}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[LOGIN DEBUG] Unexpected login error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
