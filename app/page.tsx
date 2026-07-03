'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-blue-600">EduGenie</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">AI Learning Assistant</span>
          </div>
          <p className="text-gray-600">Simplify and enhance your learning through the power of Generative AI</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to EduGenie</h2>
          <p className="text-lg text-gray-600 mb-8">
            Select a learning module below to get started. EduGenie provides intelligent educational support across multiple domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Question Answering Module */}
          <a href="/modules/question-answering" className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <span className="text-2xl">❓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ask Questions</h3>
            <p className="text-gray-600 text-sm">Get instant AI-powered answers to any question across all subjects and topics</p>
            <div className="mt-4 text-blue-600 font-semibold text-sm">Get Started →</div>
          </a>

          {/* Explanations Module */}
          <a href="/modules/explanations" className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-amber-300 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learn Concepts</h3>
            <p className="text-gray-600 text-sm">Get deep, structured explanations of any concept or topic with examples</p>
            <div className="mt-4 text-amber-600 font-semibold text-sm">Get Started →</div>
          </a>

          {/* Quiz Module */}
          <a href="/modules/quiz" className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Take Quizzes</h3>
            <p className="text-gray-600 text-sm">Generate and take AI-powered quizzes to test your knowledge and track progress</p>
            <div className="mt-4 text-purple-600 font-semibold text-sm">Get Started →</div>
          </a>

          {/* Summarization Module */}
          <a href="/modules/summarization" className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Summarize</h3>
            <p className="text-gray-600 text-sm">Condense long texts, articles, and documents into concise summaries</p>
            <div className="mt-4 text-green-600 font-semibold text-sm">Get Started →</div>
          </a>

          {/* Learning Paths Module */}
          <a href="/modules/learning-paths" className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1 p-6">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Learning Paths</h3>
            <p className="text-gray-600 text-sm">Get personalized learning recommendations and structured learning roadmaps</p>
            <div className="mt-4 text-indigo-600 font-semibold text-sm">Get Started →</div>
          </a>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose EduGenie?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fast & Efficient</h4>
                <p className="text-gray-600 text-sm">Instant responses powered by advanced AI models</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🎯</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Personalized Learning</h4>
                <p className="text-gray-600 text-sm">Tailored recommendations based on your learning style</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">📖</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Comprehensive Coverage</h4>
                <p className="text-gray-600 text-sm">Support across all subjects and academic levels</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl">🚀</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Easy to Use</h4>
                <p className="text-gray-600 text-sm">Intuitive interface designed for learners of all ages</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
