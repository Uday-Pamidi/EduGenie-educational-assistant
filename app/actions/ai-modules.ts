"use server";

import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

async function getUserId() {
  // Allow guest/anonymous access - generate a guest ID
  return "guest-" + Math.random().toString(36).substring(7);
}

// Question Answering Module
export async function answerQuestion(topic: string, question: string) {
  const userId = await getUserId();

  const prompt = `You are an expert educator. Answer the following question clearly and accurately:

Topic: ${topic}
Question: ${question}

Provide a comprehensive but concise answer with examples if relevant.`;

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    });
    return text;
  } catch (error: any) {
    console.error("[v0] Answer error:", error?.message || error);
    // Fallback response if API fails
    return `I encountered an issue generating a detailed answer. Please ensure your API is properly configured and try again.`;
  }
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

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1200,
    });
    return text;
  } catch (error: any) {
    console.error("[v0] Explanation error:", error?.message || error);
    // Fallback response if API fails
    return `I encountered an issue generating a detailed explanation. Please ensure your API is properly configured and try again.`;
  }
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

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    });

    // Parse the response
    const quizData = JSON.parse(text);
    return {
      topic,
      difficulty,
      questions: quizData.questions || [],
      totalQuestions: quizData.questions?.length || 5,
    };
  } catch (error: any) {
    console.error("[v0] Quiz error:", error?.message || error);
    // Return empty quiz if API fails
    return {
      topic,
      difficulty,
      questions: [],
      totalQuestions: 0,
      error: "Failed to generate quiz. Please try again.",
    };
  }
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

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    });
    return text;
  } catch (error: any) {
    console.error("[v0] Summarization error:", error?.message || error);
    // Fallback response if API fails
    return `I encountered an issue summarizing the content. Please ensure your API is properly configured and try again.`;
  }
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

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Parse the response
    const pathData = JSON.parse(text);
    return {
      subject,
      level,
      curriculum: pathData.topics || [],
      summary: pathData.summary || "Learning path for " + subject,
    };
  } catch (error: any) {
    console.error("[v0] Learning path error:", error?.message || error);
    // Return empty learning path if API fails
    return {
      subject,
      level,
      curriculum: [],
      summary: "Failed to generate learning path. Please try again.",
      error: "API generation failed",
    };
  }
}
