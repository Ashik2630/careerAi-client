import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runJobRecommendationAgent, runSkillGapAgent } from "@/lib/ai/agents";
import { getJobsCol, getUserProfileCol } from "@/lib/db/models";

const INITIAL_SEED_JOBS = [
  {
    title: "Senior Full Stack Engineer",
    company: "TechPulse AI",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    salary: "$120,000 - $150,000",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Architect Next.js web applications, optimize MongoDB queries, and deploy microservices.",
    createdAt: new Date()
  },
  {
    title: "Frontend Developer (React/Next.js)",
    company: "CloudScale Systems",
    skills: ["React", "TypeScript", "Tailwind CSS", "Redux", "REST API"],
    salary: "$90,000 - $115,000",
    location: "New York / Hybrid",
    type: "Full-time",
    description: "Build ultra-fast user interfaces with React 19, Tailwind CSS, and TypeScript.",
    createdAt: new Date()
  },
  {
    title: "AI Solutions & Backend Engineer",
    company: "Innovate Labs",
    skills: ["Node.js", "Python", "MongoDB", "Docker", "AWS"],
    salary: "$110,000 - $140,000",
    location: "Remote",
    type: "Contract",
    description: "Integrate LLM API workflows, construct vector databases, and deploy containerized APIs.",
    createdAt: new Date()
  }
];

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const profilesCol = await getUserProfileCol();
    const userProfile = await profilesCol.findOne({ userId });

    const currentSkills = userProfile?.skills || ["React", "JavaScript", "Node.js"];
    const targetGoal = userProfile?.goal || "Full Stack Developer";

    const jobsCol = await getJobsCol();
    let jobs = await jobsCol.find({}).toArray();

    if (jobs.length === 0) {
      await jobsCol.insertMany(INITIAL_SEED_JOBS);
      jobs = await jobsCol.find({}).toArray();
    }

    const matchedJobs = await runJobRecommendationAgent({ skills: currentSkills, goal: targetGoal }, jobs);
    const skillGapAnalysis = await runSkillGapAgent(currentSkills, targetGoal);

    return NextResponse.json({
      success: true,
      data: {
        matchedJobs,
        skillGapAnalysis,
        userProfile: {
          skills: currentSkills,
          goal: targetGoal
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
