"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  MessageSquare,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Map,
  LogOut,
  Settings,
} from "lucide-react";

interface DashboardProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const modules = [
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Get instant, intelligent answers to your questions",
      href: "/modules/question-answering",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Lightbulb,
      title: "Explanations",
      description: "Deep dive into concepts with clear explanations",
      href: "/modules/explanations",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: HelpCircle,
      title: "Quiz Generator",
      description: "Test your knowledge with AI-generated quizzes",
      href: "/modules/quiz",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BookOpen,
      title: "Summarization",
      description: "Summarize and condense any learning material",
      href: "/modules/summarization",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Map,
      title: "Learning Paths",
      description: "Get personalized learning roadmaps",
      href: "/modules/learning-paths",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EG</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduGenie</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name || "Learner"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome back, {user.name?.split(" ")[0] || "Learner"}! 👋
          </h2>
          <p className="text-lg text-gray-600">
            Choose a learning module to get started and enhance your knowledge
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.href} href={module.href}>
                <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer group">
                  {/* Gradient Header */}
                  <div className={`h-20 bg-gradient-to-r ${module.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 bg-gradient-to-br ${module.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      <span>Get started</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-2">Questions Answered</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-2">Quizzes Completed</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-2">Learning Paths</p>
            <p className="text-3xl font-bold text-gray-900">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
