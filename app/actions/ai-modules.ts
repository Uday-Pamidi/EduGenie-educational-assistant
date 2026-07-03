"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

async function getUserId() {
  // Allow guest/anonymous access - generate a guest ID
  try {
    // Optional: Check for session if you implement it later
    return "guest-" + Math.random().toString(36).substring(7);
  } catch {
    return "guest-" + Math.random().toString(36).substring(7);
  }
}

// Question Answering Module
export async function answerQuestion(topic: string, question: string) {
  const userId = await getUserId();

  const prompt = `You are an expert educator. Answer the following question clearly and accurately:

Topic: ${topic}
Question: ${question}

Provide a comprehensive but concise answer with examples if relevant.`;

  let text: string;
  try {
    const { text: generatedText } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    });
    text = generatedText;
  } catch (error: any) {
    // Fallback to a simpler response if API fails
    text = `Based on your question about "${question}" in ${topic}:\n\n**Note:** EduGenie is currently running in demo mode. To enable full AI-powered answers, please:\n\n1. Set up a Google Gemini API key\n2. Add it to your environment variables as GOOGLE_GENERATIVE_AI_API_KEY\n3. Restart the application\n\nWith proper API configuration, EduGenie will provide comprehensive, expert-level educational answers to support your learning journey.`;
  }

  // Note: Database saving is disabled for public access mode

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

  let text: string;
  try {
    const response = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1200,
    });
    text = response.text;
  } catch (error: any) {
    text = `**Understanding "${concept}" in ${topic}**\n\n**Definition:** A placeholder definition of the concept.\n\n**Key Points:**\n- First key point about the concept\n- Second key point about the concept\n- Third key point about the concept\n\n**Real-World Examples:**\nExamples would be provided here when the AI API is configured.\n\n**Common Misconceptions:**\nCommon misconceptions would be addressed here when the AI API is configured.\n\n*To enable full AI-powered explanations, please configure your Google Gemini API key in the environment variables.*`;
  }

  // Database saving disabled for public access mode
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

  let quizData: any;
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    });

    // Parse the response
    quizData = JSON.parse(text);
  } catch (error: any) {
    // Fallback quiz if parsing or API fails
    quizData = {
      questions: [
        {
          question: "Sample question about " + topic,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correct: 0,
          explanation: "This is the correct answer. Configure your Google Gemini API for real questions.",
        },
        {
          question: "What is a key concept in " + topic + "?",
          options: ["Concept A", "Concept B", "Concept C", "Concept D"],
          correct: 1,
          explanation: "Configure your API to get personalized quiz questions.",
        },
      ],
    };
  }

  // Return quiz data (no database saving in public mode)
  return {
    topic,
    difficulty,
    questions: quizData.questions || [],
    totalQuestions: quizData.questions?.length || 2,
  };
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

  let text: string;
  try {
    const { text: generatedText } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    });
    text = generatedText;
  } catch (error: any) {
    text = `**Summary of Content about ${topic}**\n\n**Main Points:**\n- Key point 1 would appear here\n- Key point 2 would appear here\n- Key point 3 would appear here\n\n**Key Takeaways:**\n- Important takeaway 1\n- Important takeaway 2\n\n**Important Terms:**\n- Term 1: Definition\n- Term 2: Definition\n\n*Configure your Google Gemini API key to enable real-time summarization of educational content.*`;
  }

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

  let pathData: any;
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    // Parse the response
    pathData = JSON.parse(text);
  } catch (error: any) {
    pathData = {
      topics: [
        {
          name: "Introduction to " + subject,
          duration: "2-3 hours",
          resources: ["Basic tutorials", "Reading materials"],
          skills: ["Understanding fundamentals"],
        },
        {
          name: "Core Concepts of " + subject,
          duration: "4-6 hours",
          resources: ["Video lectures", "Practice problems"],
          skills: ["Applying core concepts"],
        },
        {
          name: "Advanced Topics in " + subject,
          duration: "6-10 hours",
          resources: ["Case studies", "Projects"],
          skills: ["Mastering advanced topics"],
        },
      ],
      summary: "A " + level + "-friendly learning path to learn " + subject + ". Configure your API for personalized recommendations.",
    };
  }

  // Return learning path (no database saving in public mode)
  return {
    subject,
    level,
    curriculum: pathData.topics || [],
    summary: pathData.summary || "Learning path for " + subject,
  };
}
