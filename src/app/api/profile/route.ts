import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { getUserProfileCol } from "@/lib/db/models";

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const profilesCol = await getUserProfileCol();
    const profile = await profilesCol.findOne({ userId });

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: {
          name: session?.name || "Alex Candidate",
          email: session?.email || "alex@example.com",
          skills: ["React", "JavaScript", "Node.js", "Tailwind CSS"],
          education: "Bachelor of Science in Computer Science",
          experience: "2 years software developer experience",
          goal: "Frontend Developer"
        }
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const body = await request.json();
    const { name, email, skills, education, experience, goal } = body;

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const profilesCol = await getUserProfileCol();

    const updateDoc = {
      userId,
      name: name || session?.name || "Alex Candidate",
      email: email || session?.email || "alex@example.com",
      skills: parsedSkills,
      education: education || "",
      experience: experience || "",
      goal: goal || "Full Stack Developer",
      updatedAt: new Date()
    };

    await profilesCol.updateOne(
      { userId },
      { $set: updateDoc },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: updateDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
