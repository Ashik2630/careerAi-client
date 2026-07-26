import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { getJobsCol } from "@/lib/db/models";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const jobsCol = await getJobsCol();

    if (id) {
      let query: any;
      try {
        query = { _id: new ObjectId(id) };
      } catch {
        query = { _id: id as any };
      }
      const item = await jobsCol.findOne(query);
      if (!item) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: item });
    }

    const items = await jobsCol.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const body = await request.json();
    const { title, company, skills, salary, location, type = "Full-time", description } = body;

    if (!title || !company) {
      return NextResponse.json({ error: "Title and Company are required" }, { status: 400 });
    }

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const jobsCol = await getJobsCol();
    const newItem = {
      userId,
      title,
      company,
      skills: parsedSkills,
      salary: salary || "$80,000 - $110,000",
      location: location || "Remote",
      type,
      description: description || "Exciting opportunity for modern web developers.",
      createdAt: new Date()
    };

    const res = await jobsCol.insertOne(newItem);

    return NextResponse.json({ success: true, data: { ...newItem, _id: res.insertedId } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const jobsCol = await getJobsCol();
    await jobsCol.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
