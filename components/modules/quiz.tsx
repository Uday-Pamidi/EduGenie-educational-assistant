"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateQuiz } from "@/app/actions/ai-modules";
import { ArrowLeft, HelpCircle, Loader2, CheckCircle, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function QuizModule() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);

    try {
      const result = await generateQuiz(topic, difficulty);
      setQuiz(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (!submitted) {
      setAnswers({
        ...answers,
        [questionIndex]: optionIndex,
      });
    }
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    if (!quiz?.questions) return 0;
    const correct = Object.entries(answers).filter(([idx, selected]) => {
      return quiz.questions[parseInt(idx)]?.correct === selected;
    }).length;
    return correct;
  };

  const score = calculateScore();
  const totalQuestions = quiz?.questions?.length || 0;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Quiz Generator</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!quiz ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleGenerateQuiz} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., World War II, Calculus, Photosynthesis"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        difficulty === level
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !topic.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5" />
                    Generate Quiz
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
            {/* Quiz Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic}</h2>
              <p className="text-gray-600">
                {totalQuestions} Questions • {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
              </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {quiz?.questions?.map((q: Question, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Question {idx + 1}: {q.question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {q.options.map((option: string, optIdx: number) => {
                      const isSelected = answers[idx] === optIdx;
                      const isCorrect = q.correct === optIdx;
                      const showResult = submitted;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(idx, optIdx)}
                          disabled={submitted}
                          className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                            showResult && isCorrect
                              ? "bg-green-100 border-2 border-green-500 text-green-900"
                              : showResult && isSelected && !isCorrect
                                ? "bg-red-100 border-2 border-red-500 text-red-900"
                                : isSelected
                                  ? "bg-purple-100 border-2 border-purple-500 text-purple-900"
                                  : "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 flex items-center justify-center bg-current rounded-full text-white">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{option}</span>
                            {showResult && isCorrect && <CheckCircle className="w-5 h-5 ml-auto" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 ml-auto" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm text-blue-900">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Results or Submit */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-6xl font-bold text-purple-600 mb-2">
                      {percentage.toFixed(0)}%
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      You got {score} out of {totalQuestions} correct
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setQuiz(null);
                      setAnswers({});
                      setSubmitted(false);
                      setTopic("");
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
                  >
                    Take Another Quiz
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < totalQuestions}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
