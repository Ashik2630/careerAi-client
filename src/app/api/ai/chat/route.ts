import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runInterviewCoachAgent } from "@/lib/ai/agents";
import { getConversationsCol, ChatMessage } from "@/lib/db/models";

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const body = await request.json();
    const { message, targetRole = "Full Stack Engineer" } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const conversationsCol = await getConversationsCol();
    let userConv = await conversationsCol.findOne({ userId });

    const existingMessages: ChatMessage[] = userConv?.messages || [];
    const userMsg: ChatMessage = { role: "user", content: message, timestamp: new Date() };

    // Get AI response from Interview Coach / Career Agent
    const aiContent = await runInterviewCoachAgent(targetRole, message, existingMessages);
    const aiMsg: ChatMessage = { role: "assistant", content: aiContent, timestamp: new Date() };

    const updatedMessages = [...existingMessages, userMsg, aiMsg];

    if (userConv) {
      await conversationsCol.updateOne(
        { userId },
        { $set: { messages: updatedMessages, updatedAt: new Date() } }
      );
    } else {
      await conversationsCol.insertOne({
        userId,
        title: `Career Coaching - ${targetRole}`,
        messages: updatedMessages,
        updatedAt: new Date()
      });
    }

    return NextResponse.json({ success: true, messages: updatedMessages, reply: aiMsg });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Chat failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.email || "guest-user";

    const conversationsCol = await getConversationsCol();
    const userConv = await conversationsCol.findOne({ userId });

    return NextResponse.json({
      success: true,
      messages: userConv?.messages || [
        {
          role: "assistant",
          content: "Hello! I am your **CareerAI Assistant & Interview Coach**. Ask me anything about your resume, skill growth, or mock interview prep!",
          timestamp: new Date()
        }
      ]
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
