import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobListingSchema } from "@/lib/admin-validations";

export async function GET() {
  try {
    const jobs = await prisma.jobListing.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = jobListingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existing = await prisma.jobListing.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A job listing with this slug already exists" },
        { status: 409 }
      );
    }

    const job = await prisma.jobListing.create({ data });
    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create job listing" }, { status: 500 });
  }
}
