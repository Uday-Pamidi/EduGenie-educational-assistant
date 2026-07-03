"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { summarizeText } from "@/app/actions/ai-modules";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import Markdown from "react-markdown";

export default function SummarizationModule() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !content.trim()) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const result = await summarizeText(topic, content);
      setSummary(result);
    } catch (err: any) {
      setError(err.message || "Failed to summarize text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Summarization</h1>
          </div>
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
                placeholder="e.g., Climate Change, Machine Learning"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content to Summarize
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the text you want to summarize..."
                rows={8}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {content.length} characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !topic.trim() || !content.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5" />
                  Summarize
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {summary && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Summary</h2>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 prose prose-sm max-w-none border-l-4 border-green-500">
                <div className="text-gray-900">
                  <Markdown>{summary}</Markdown>
                </div>
              </div>
              <Button
                onClick={() => setSummary("")}
                className="text-green-600 hover:underline px-0"
              >
                Summarize Another Text
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
