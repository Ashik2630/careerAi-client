import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { getUserProfileCol, getDb } from "@/lib/db/models";

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.id || session?.email || "guest-user";
    const sessionEmail = session?.email;

    const profilesCol = await getUserProfileCol();
    let profile = await profilesCol.findOne({
      $or: [
        { userId },
        ...(sessionEmail ? [{ email: sessionEmail }] : []),
        ...(session?.id ? [{ userId: session.id }] : [])
      ]
    });

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: {
          name: session?.name || "Alex Candidate",
          email: session?.email || "alex@example.com",
          role: (session as any)?.role || "job-seeker",
          isPro: false,
          plan: "Free",
          skills: ["React", "JavaScript", "Node.js", "Tailwind CSS"],
          education: "Bachelor of Science in Computer Science",
          experience: "2 years software developer experience",
          goal: "Frontend Developer"
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...profile,
        name: profile.name || session?.name || "Alex Candidate",
        email: profile.email || session?.email || "alex@example.com",
        role: profile.role || (session as any)?.role || "job-seeker",
        isPro: profile.isPro || false,
        plan: profile.plan || "Free",
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const body = await request.json();
    const { name, email, role, skills, education, experience, goal, isPro, plan } = body;

    const targetEmail = email || session?.email || "alex@example.com";
    const targetName = name || session?.name || "Alex Candidate";
    const userId = session?.id || session?.email || "guest-user";

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const profilesCol = await getUserProfileCol();

    const updateDoc: Record<string, any> = {
      userId,
      name: targetName,
      email: targetEmail,
      role: role || (session as any)?.role || "job-seeker",
      skills: parsedSkills,
      education: education || "",
      experience: experience || "",
      goal: goal || "Full Stack Developer",
      ...(typeof isPro === "boolean" ? { isPro } : {}),
      ...(plan ? { plan } : {}),
      updatedAt: new Date()
    };

    await profilesCol.updateOne(
      { $or: [{ userId }, { email: targetEmail }] },
      { $set: updateDoc },
      { upsert: true }
    );

    // Sync with DB user collections for session user name updates
    if (session?.email || session?.id) {
      try {
        const db = await getDb();
        const emailList = [session?.email, targetEmail].filter(Boolean) as string[];
        const queryFilter: any = {
          $or: [
            { email: { $in: emailList } },
            ...(session?.id ? [{ id: session.id }] : [])
          ]
        };

        await db.collection("user").updateMany(
          queryFilter,
          { $set: { name: targetName, email: targetEmail } }
        ).catch(() => {});

        await db.collection("users").updateMany(
          queryFilter,
          { $set: { name: targetName, email: targetEmail } }
        ).catch(() => {});
      } catch (e) {
        console.error("User collection update error:", e);
      }
    }

    return NextResponse.json({ success: true, data: updateDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

