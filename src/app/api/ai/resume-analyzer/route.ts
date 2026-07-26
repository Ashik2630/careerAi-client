import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runResumeAnalyzerAgent } from "@/lib/ai/agents";
import { getResumesCol } from "@/lib/db/models";

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const body = await request.json();
    const { resumeText, targetRole = "Software Engineer", fileName = "resume.pdf" } = body;

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 });
    }

    // Run Resume Analyzer Agent
    const analysis = await runResumeAnalyzerAgent(resumeText, targetRole);

    // Save result in MongoDB `resumes` collection
    const resumesCol = await getResumesCol();
    const resumeRecord = {
      userId,
      fileName,
      resumeText,
      score: analysis.score,
      extractedSkills: analysis.extractedSkills,
      missingSkills: analysis.missingSkills,
      weaknesses: analysis.weaknesses,
      summary: analysis.summary,
      recommendations: analysis.recommendations,
      createdAt: new Date()
    };

    await resumesCol.insertOne(resumeRecord);

    return NextResponse.json({ success: true, data: resumeRecord });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to analyze resume" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const resumesCol = await getResumesCol();
    const history = await resumesCol.find({ userId }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: history });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
