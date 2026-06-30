"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateLearningPath } from "@/app/actions/ai-modules";
import { ArrowLeft, Map, Loader2, CheckCircle2 } from "lucide-react";

interface Topic {
  name: string;
  duration: string;
  resources: string[];
  skills: string[];
}

export default function LearningPathsModule() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("beginner");
  const [path, setPath] = useState<any>(null);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGeneratePath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setLoading(true);
    setError("");
    setPath(null);
    setCompletedTopics([]);

    try {
      const result = await generateLearningPath(subject, level);
      setPath(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate learning path");
    } finally {
      setLoading(false);
    }
  };

  const toggleTopicCompletion = (idx: number) => {
    if (completedTopics.includes(idx)) {
      setCompletedTopics(completedTopics.filter((i) => i !== idx));
    } else {
      setCompletedTopics([...completedTopics, idx]);
    }
  };

  const progress =
    path?.curriculum?.length > 0
      ? (completedTopics.length / path.curriculum.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Map className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!path ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleGeneratePath} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Web Development, Data Science, Python Programming"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Learning Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["beginner", "intermediate", "advanced"].map((lv) => (
                    <button
                      key={lv}
                      type="button"
                      onClick={() => setLevel(lv)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        level === lv
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lv.charAt(0).toUpperCase() + lv.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !subject.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Path...
                  </>
                ) : (
                  <>
                    <Map className="w-5 h-5" />
                    Generate Learning Path
                  </>
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{subject}</h2>
              <p className="text-gray-600 mb-6">
                {level.charAt(0).toUpperCase() + level.slice(1)} Level • {path?.curriculum?.length || 0} Topics
              </p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700">Progress</span>
                  <span className="font-bold text-indigo-600">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            {path?.summary && (
              <div className="bg-indigo-50 rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Overview</h3>
                <p className="text-gray-700">{path.summary}</p>
              </div>
            )}

            {/* Topics */}
            <div className="space-y-4">
              {path?.curriculum?.map((topic: Topic, idx: number) => {
                const isCompleted = completedTopics.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTopicCompletion(idx)}
                    className={`rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
                      isCompleted
                        ? "bg-indigo-50 border-2 border-indigo-500"
                        : "bg-white hover:shadow-xl"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          isCompleted
                            ? "bg-indigo-600 border-indigo-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-lg font-bold mb-2 ${
                            isCompleted ? "text-indigo-900" : "text-gray-900"
                          }`}
                        >
                          {topic.name}
                        </h3>

                        <p
                          className={`text-sm mb-3 ${
                            isCompleted ? "text-indigo-700" : "text-gray-600"
                          }`}
                        >
                          ⏱️ {topic.duration}
                        </p>

                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Resources:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {topic.resources?.map((resource: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                  {resource}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                              Skills to Learn:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {topic.skills?.map((skill: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex gap-4">
              <Button
                onClick={() => {
                  setPath(null);
                  setCompletedTopics([]);
                  setSubject("");
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
              >
                Create New Path
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
