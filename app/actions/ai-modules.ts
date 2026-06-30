"use server";

import { generateText, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { learningHistories, quizzes, learningPaths } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session.user.id;
}

// Question Answering Module
export async function answerQuestion(topic: string, question: string) {
  const userId = await getUserId();

  const prompt = `You are an expert educator. Answer the following question clearly and accurately:

Topic: ${topic}
Question: ${question}

Provide a comprehensive but concise answer with examples if relevant.`;

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.7,
    maxTokens: 1000,
  });

  // Save to learning history
  await db.insert(learningHistories).values({
    userId,
    moduleType: "question_answering",
    topic,
    query: question,
    response: text,
  });

  return text;
}

// Explanation Module
export async function explainConcept(topic: string, concept: string) {
  const userId = await getUserId();

  const prompt = `You are an expert tutor. Explain the following concept in a way that's easy to understand:

Topic: ${topic}
Concept: ${concept}

Structure your explanation with:
1. Simple definition
2. Key points
3. Real-world examples
4. Common misconceptions`;

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.7,
    maxTokens: 1200,
  });

  await db.insert(learningHistories).values({
    userId,
    moduleType: "explanation",
    topic,
    query: concept,
    response: text,
  });

  return text;
}

// Quiz Generation Module
export async function generateQuiz(topic: string, difficulty: string = "medium") {
  const userId = await getUserId();

  const prompt = `Generate a quiz with 5 multiple-choice questions about ${topic} at ${difficulty} level.

Return ONLY a valid JSON object with this structure:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Why this is correct"
    }
  ]
}

Ensure valid JSON with proper escaping.`;

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.7,
    maxTokens: 1500,
  });

  // Parse the response
  let quizData;
  try {
    quizData = JSON.parse(text);
  } catch {
    // Fallback quiz if parsing fails
    quizData = {
      questions: [
        {
          question: "Sample question about " + topic,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "This is the correct answer.",
        },
      ],
    };
  }

  // Save quiz to database
  const result = await db
    .insert(quizzes)
    .values({
      userId,
      topic,
      questions: quizData.questions,
      difficulty,
      totalQuestions: quizData.questions?.length || 5,
    })
    .returning();

  return result[0];
}

// Summarization Module
export async function summarizeText(topic: string, content: string) {
  const userId = await getUserId();

  const prompt = `Summarize the following educational content about ${topic}:

${content}

Provide a concise summary with:
1. Main points (bullet points)
2. Key takeaways
3. Important terms and definitions`;

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.7,
    maxTokens: 1000,
  });

  await db.insert(learningHistories).values({
    userId,
    moduleType: "summarization",
    topic,
    query: content.substring(0, 500),
    response: text,
  });

  return text;
}

// Learning Path Recommendation Module
export async function generateLearningPath(subject: string, level: string = "beginner") {
  const userId = await getUserId();

  const prompt = `Create a personalized learning path for a ${level} student learning ${subject}.

Return ONLY a valid JSON object with this structure:
{
  "topics": [
    {
      "name": "Topic name",
      "duration": "estimated hours",
      "resources": ["resource1", "resource2"],
      "skills": ["skill1", "skill2"]
    }
  ],
  "summary": "Overall path summary"
}

Ensure valid JSON with proper escaping.`;

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    prompt,
    temperature: 0.7,
    maxTokens: 2000,
  });

  // Parse the response
  let pathData;
  try {
    pathData = JSON.parse(text);
  } catch {
    pathData = {
      topics: [
        {
          name: "Introduction to " + subject,
          duration: "2-3 hours",
          resources: ["Basic tutorials", "Reading materials"],
          skills: ["Understanding fundamentals"],
        },
      ],
      summary: "A beginner-friendly path to learn " + subject,
    };
  }

  // Save learning path
  const result = await db
    .insert(learningPaths)
    .values({
      userId,
      subject,
      level,
      curriculum: pathData.topics,
    })
    .returning();

  return result[0];
}

// Get user learning history
export async function getLearningHistory() {
  const userId = await getUserId();

  const history = await db
    .select()
    .from(learningHistories)
    .where(eq(learningHistories.userId, userId));

  return history;
}

// Get user quizzes
export async function getUserQuizzes() {
  const userId = await getUserId();

  const userQuizzes = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.userId, userId));

  return userQuizzes;
}
