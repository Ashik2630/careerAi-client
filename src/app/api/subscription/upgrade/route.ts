import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { getUserProfileCol, getDb } from "@/lib/db/models";

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    if (!session || (!session.email && !session.id)) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const userId = session.id || session.email;
    const email = session.email;
    const name = session.name || "Alex Candidate";

    const body = await request.json().catch(() => ({}));
    const planName = body.planName || "Pro Career";

    const profilesCol = await getUserProfileCol();

    const updateDoc = {
      userId,
      email,
      name,
      isPro: true,
      plan: planName,
      proActivatedAt: new Date(),
      updatedAt: new Date()
    };

    await profilesCol.updateOne(
      { $or: [{ userId }, ...(email ? [{ email }] : [])] },
      { $set: updateDoc },
      { upsert: true }
    );

    // Sync to user collection as well
    try {
      const db = await getDb();
      const query = { $or: [{ email }, ...(session.id ? [{ id: session.id }] : [])] };
      await db.collection("users").updateMany(query, { $set: { isPro: true, plan: planName } }).catch(() => {});
      await db.collection("user").updateMany(query, { $set: { isPro: true, plan: planName } }).catch(() => {});
    } catch (e) {
      console.error("User collection sync error:", e);
    }

    // Fetch full updated profile
    const updatedProfile = await profilesCol.findOne({
      $or: [{ userId }, ...(email ? [{ email }] : [])]
    });

    return NextResponse.json({
      success: true,
      message: "Congratulations! You have successfully upgraded to PRO Plan.",
      data: updatedProfile || updateDoc
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to upgrade subscription" }, { status: 500 });
  }
}
