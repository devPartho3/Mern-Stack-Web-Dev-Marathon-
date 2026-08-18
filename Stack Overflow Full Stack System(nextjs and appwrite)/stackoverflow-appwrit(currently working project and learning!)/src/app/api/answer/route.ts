import { NextRequest, NextResponse } from "next/server";
import { databases, users } from "@/";
import { ID } from "node-appwrite";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  try {
    const { questionId, answer, authorId } = await req.json();

    await databases.createDocument(
      env.appwrite.databaseId,
      "answers",
      ID.unique(),
      {
        questionId,
        content: answer,
        authorId,
        createdAt: new Date().toISOString(),
      }
    );

    const prefs = await users.getPrefs(authorId);

    await users.updatePrefs(authorId, {
      reputation: (prefs.reputation ?? 0) + 1,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}