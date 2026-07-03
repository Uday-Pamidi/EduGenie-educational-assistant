"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { answerQuestion } from "@/app/actions/ai-modules";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Markdown from "react-markdown";

export default function QuestionAnsweringModule() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const result = await answerQuestion(topic, question);
      setAnswer(result);
    } catch (err: any) {
      setError(err.message || "Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Ask Questions</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Physics, Biology, Mathematics"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question related to the topic..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !topic.trim() || !question.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get Answer
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {answer && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Answer</h2>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 prose prose-sm max-w-none">
                <div className="text-gray-900">
                  <Markdown>{answer}</Markdown>
                </div>
              </div>
              <Button
                onClick={() => setAnswer("")}
                className="text-blue-600 hover:underline px-0"
              >
                Ask Another Question
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
