import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runResumeContentGeneratorAgent } from "@/lib/ai/agents";

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const defaultName = session?.name || "Job Seeker";

    const body = await request.json();
    const {
      name = defaultName,
      education = "Bachelor of Science in Computer Science",
      skills = ["React", "Node.js", "TypeScript"],
      experience = "2 years software engineering experience",
      targetJob = "Frontend Developer"
    } = body;

    const generated = await runResumeContentGeneratorAgent({
      name,
      education,
      skills: Array.isArray(skills) ? skills : [skills],
      experience,
      targetJob
    });

    return NextResponse.json({ success: true, data: generated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Content generation failed" }, { status: 500 });
  }
}
