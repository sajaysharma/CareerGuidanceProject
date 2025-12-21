import { Link } from "react-router-dom";
import { Brain, TrendingUp, Target, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
          <Brain className="h-8 w-8" />
          <span>CareerAI</span>
        </div>

        <div className="space-x-4">
          <Link
            to="/login"
            className="font-medium text-gray-600 hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex flex-1 items-center justify-center px-4 text-center">
        <div className="max-w-4xl space-y-6">

          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600">
            🚀 AI-Powered Career Guidance
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 md:text-7xl">
            Discover Your Perfect <br />
            <span className="bg-gradient-to from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Our AI analyzes your skills and interests to recommend the best
            career path and a clear learning roadmap.
          </p>

          <div className="flex justify-center pt-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-indigo-700"
            >
              Analyze My Profile
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">

          <div className="rounded-2xl bg-gray-50 p-8 transition hover:shadow-lg">
            <Brain className="mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="mb-2 text-xl font-bold">AI Analysis</h3>
            <p className="text-gray-600">
              Smart analysis of your academic and skill profile.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-8 transition hover:shadow-lg">
            <Target className="mb-4 h-10 w-10 text-purple-600" />
            <h3 className="mb-2 text-xl font-bold">Skill Roadmap</h3>
            <p className="text-gray-600">
              Step-by-step learning path tailored for you.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-8 transition hover:shadow-lg">
            <TrendingUp className="mb-4 h-10 w-10 text-pink-600" />
            <h3 className="mb-2 text-xl font-bold">Market Trends</h3>
            <p className="text-gray-600">
              Career suggestions based on real market demand.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        © 2025 CareerAI. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
