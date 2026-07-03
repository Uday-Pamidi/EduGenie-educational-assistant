"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { explainConcept } from "@/app/actions/ai-modules";
import { ArrowLeft, Lightbulb, Loader2 } from "lucide-react";
import Markdown from "react-markdown";

export default function ExplanationsModule() {
  const [topic, setTopic] = useState("");
  const [concept, setConcept] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !concept.trim()) return;

    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const result = await explainConcept(topic, concept);
      setExplanation(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate explanation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Concept Explanations</h1>
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
                placeholder="e.g., Photosynthesis, Quantum Physics"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Concept to Explain
              </label>
              <textarea
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Enter the concept you want to understand..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !topic.trim() || !concept.trim()}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Explanation...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5" />
                  Get Explanation
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {explanation && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Explanation</h2>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 prose prose-sm max-w-none border-l-4 border-yellow-500">
                <div className="text-gray-900">
                  <Markdown>{explanation}</Markdown>
                </div>
              </div>
              <Button
                onClick={() => setExplanation("")}
                className="text-yellow-600 hover:underline px-0"
              >
                Explain Another Concept
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
