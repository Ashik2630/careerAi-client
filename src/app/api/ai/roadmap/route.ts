import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runLearningRoadmapAgent } from "@/lib/ai/agents";
import { getCareerPlansCol, getUserProfileCol } from "@/lib/db/models";

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const profilesCol = await getUserProfileCol();
    const userProfile = await profilesCol.findOne({ userId });

    const currentSkills = userProfile?.skills || ["React", "JavaScript"];
    const targetGoal = userProfile?.goal || "Full Stack Developer";

    const careerPlansCol = await getCareerPlansCol();
    let plan = await careerPlansCol.findOne({ userId });

    if (!plan) {
      const roadmapItems = await runLearningRoadmapAgent(currentSkills, targetGoal);
      const newPlan = {
        userId,
        targetGoal,
        overallProgress: 35,
        roadmap: roadmapItems,
        updatedAt: new Date()
      };
      const res = await careerPlansCol.insertOne(newPlan);
      plan = { ...newPlan, _id: res.insertedId };
    }

    return NextResponse.json({ success: true, data: plan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const body = await request.json();
    const { stepId, completed } = body;

    const careerPlansCol = await getCareerPlansCol();
    const plan = await careerPlansCol.findOne({ userId });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const updatedRoadmap = plan.roadmap.map(item =>
      item.id === stepId ? { ...item, completed: Boolean(completed) } : item
    );

    const completedCount = updatedRoadmap.filter(i => i.completed).length;
    const overallProgress = Math.round((completedCount / updatedRoadmap.length) * 100);

    await careerPlansCol.updateOne(
      { userId },
      { $set: { roadmap: updatedRoadmap, overallProgress, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true, roadmap: updatedRoadmap, overallProgress });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
