'use client';

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data?.user) {
          redirect("/sign-in");
        }
        setSession(data);
      } catch (error) {
        redirect("/sign-in");
      } finally {
        setLoading(false);
      }
    };
    getSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome, {session?.user?.name || "Learner"}!</h1>
            <p className="text-gray-600 mt-2">Select a learning module to get started</p>
          </div>
          <button
            onClick={() => authClient.signOut()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Question Answering Module */}
          <a href="/modules/question-answering" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <span className="text-2xl">❓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ask Questions</h3>
            <p className="text-gray-600">Get instant AI-powered answers to any question across all subjects</p>
          </a>

          {/* Explanations Module */}
          <a href="/modules/explanations" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learn Concepts</h3>
            <p className="text-gray-600">Get deep, structured explanations of any concept or topic</p>
          </a>

          {/* Quiz Module */}
          <a href="/modules/quiz" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Take Quizzes</h3>
            <p className="text-gray-600">Generate and take AI-powered quizzes to test your knowledge</p>
          </a>

          {/* Summarization Module */}
          <a href="/modules/summarization" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Summarize</h3>
            <p className="text-gray-600">Condense long texts into concise, meaningful summaries</p>
          </a>

          {/* Learning Paths Module */}
          <a href="/modules/learning-paths" className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learning Paths</h3>
            <p className="text-gray-600">Get personalized learning recommendations based on your goals</p>
          </a>
        </div>
      </div>
    </div>
  );
}
