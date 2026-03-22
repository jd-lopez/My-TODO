import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";

export default function Landing() {
  const { isDark } = useTheme();
  const slides = [
    {
      tag: "Focused Task Management",
      title:
        "Build momentum every day with a TODO system that scales with you.",
      text: "From personal planning to team coordination, manage your priorities in one clear workspace built for speed and consistency.",
    },
    {
      tag: "Clear Team Alignment",
      title: "Coordinate work across projects without losing visibility.",
      text: "Track what is pending, in progress, and completed with a flow your team can understand in seconds.",
    },
    {
      tag: "Deliver Consistently",
      title: "Turn scattered tasks into an execution routine that sticks.",
      text: "Use one board to prioritize, execute, and close work while keeping your daily goals on track.",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  function nextSlide() {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <section
        id="home"
        className={`min-h-[58vh] md:min-h-[62vh] flex items-center bg-no-repeat bg-cover bg-center ${
          isDark
            ? "bgImgMobNight md:bgImgDeskNight"
            : "bgImgMobDay md:bgImgDeskDay"
        }`}
      >
        <div className="mx-auto w-full  max-w-6xl px-6 py-10 md:py-12">
          <div
            className={`mx-auto max-w-3xl rounded-3xl flex flex-col justify-between items-stretch border p-8 shadow-2xl backdrop-blur-md md:p-10 ${
              isDark
                ? "bg-slate-900/75 border-slate-700"
                : "bg-white/80 border-slate-200"
            }`}
          >
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
                {slides[activeSlide].tag}
              </p>
              <h1 className="mt-3 min-h-34 text-4xl font-bold leading-tight md:min-h-80 md:text-6xl">
                {slides[activeSlide].title}
              </h1>
              <p
                className={`mt-5 min-h-18 text-base md:min-h-14 md:text-lg ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {slides[activeSlide].text}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-8 bg-blue-600"
                        : isDark
                          ? "w-2.5 bg-slate-600"
                          : "w-2.5 bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold border ${
                    isDark
                      ? "border-slate-600 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                  }`}
                  aria-label="Previous slide"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold border ${
                    isDark
                      ? "border-slate-600 hover:bg-slate-800"
                      : "border-slate-300 hover:bg-slate-100"
                  }`}
                  aria-label="Next slide"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/signup"
                className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className={`rounded-xl border px-6 py-3 text-sm font-semibold ${
                  isDark
                    ? "border-slate-500 hover:bg-slate-800"
                    : "border-slate-400 hover:bg-slate-100"
                }`}
              >
                Log In
              </Link>
              <a
                href="#features"
                className={`rounded-xl px-6 py-3 text-sm font-semibold ${
                  isDark ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-6xl scroll-mt-26 px-6 py-16"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            Designed for focused execution
          </h2>
          <p
            className={`mt-3 max-w-2xl ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Stop juggling tools. Keep planning, tracking, and reviewing progress
            in one simple flow.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Smart Organization</h3>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Break work into clear columns and keep priorities visible at every
              stage.
            </p>
          </article>
          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Fast Updates</h3>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Add, move, and complete tasks in seconds with minimal friction and
              a clean UI.
            </p>
          </article>
          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Reliable Focus</h3>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Keep teams aligned and reduce context switching by centralizing
              your daily plan.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div
          className={`grid gap-4 rounded-3xl border p-6 md:grid-cols-4 md:p-8 ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Why teams adopt it
            </p>
            <h3 className="mt-2 text-2xl font-bold">A workflow that stays clear</h3>
          </div>
          <div>
            <p className="text-3xl font-bold">1 board</p>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Keep strategy, execution, and review tied together in one visible
              space instead of scattered tools.
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">3 layers</p>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Boards, lists, and task cards give structure without forcing a
              heavy process on the team.
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Fast context</p>
            <p
              className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Review what is blocked, in motion, or finished in seconds instead
              of hunting through updates.
            </p>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto scroll-mt-26 w-full max-w-6xl px-6 pb-16"
      >
        <div
          className={`rounded-3xl border p-8 md:p-10 ${
            isDark
              ? "border-slate-700 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Step 1
              </p>
              <h3 className="mt-2 text-xl font-semibold">Capture Tasks</h3>
              <p
                className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Add tasks quickly as soon as they appear to keep your inbox
                clean.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Step 2
              </p>
              <h3 className="mt-2 text-xl font-semibold">Prioritize Work</h3>
              <p
                className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Drag tasks into your workflow columns and focus on what matters
                now.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Step 3
              </p>
              <h3 className="mt-2 text-xl font-semibold">Ship Consistently</h3>
              <p
                className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
              >
                Track progress, complete items, and build a dependable delivery
                rhythm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            Flexible enough for personal focus and internal team use
          </h2>
          <p
            className={`mt-3 max-w-3xl ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Start with a personal board to manage your own priorities, then
            expand the same structure into shared boards for projects, team
            workflows, and internal execution visibility.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Personal Use
            </p>
            <h3 className="mt-2 text-xl font-semibold">Stay on top of daily work</h3>
            <p
              className={`mt-3 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Keep your own task flow simple, visible, and easy to maintain as
              priorities shift during the week.
            </p>
          </article>

          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Shared Boards
            </p>
            <h3 className="mt-2 text-xl font-semibold">Coordinate with less friction</h3>
            <p
              className={`mt-3 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Let teammates understand current work, ownership, and next actions
              without needing a meeting for every status update.
            </p>
          </article>

          <article
            className={`rounded-2xl border p-6 ${
              isDark
                ? "border-slate-700 bg-slate-900"
                : "border-slate-200 bg-white"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Leadership View
            </p>
            <h3 className="mt-2 text-xl font-semibold">See progress without micromanaging</h3>
            <p
              className={`mt-3 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              Understand what is moving, what needs attention, and where work is
              stuck while the team keeps executing.
            </p>
          </article>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto w-full max-w-6xl scroll-mt-26 px-6 pb-20"
      >
        <div
          className={`rounded-3xl border p-8 text-center md:p-12 ${
            isDark
              ? "border-blue-900 bg-linear-to-r from-slate-900 to-blue-950"
              : "border-blue-200 bg-linear-to-r from-blue-50 to-slate-100"
          }`}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Start organizing your work today
          </h2>
          <p
            className={`mx-auto mt-3 max-w-2xl ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Create your account and turn daily chaos into a clear, repeatable
            system.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Sign up now
            </Link>
            <Link
              to="/login"
              className={`rounded-xl border px-6 py-3 text-sm font-semibold ${
                isDark
                  ? "border-slate-500 hover:bg-slate-800"
                  : "border-slate-400 hover:bg-slate-100"
              }`}
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      <footer
        className={`border-t ${
          isDark ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold">TODO FLOW</h2>
            <p
              className={`mt-3 max-w-xl text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}
            >
              A clean task workspace built around boards, lists, and task cards
              so individuals and teams can move from planning to delivery with
              less friction.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Navigation
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#features" className={isDark ? "text-slate-200" : "text-slate-700"}>
                Features
              </a>
              <a href="#workflow" className={isDark ? "text-slate-200" : "text-slate-700"}>
                Workflow
              </a>
              <a href="#get-started" className={isDark ? "text-slate-200" : "text-slate-700"}>
                Get Started
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Account
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/login" className={isDark ? "text-slate-200" : "text-slate-700"}>
                Log In
              </Link>
              <Link to="/signup" className={isDark ? "text-slate-200" : "text-slate-700"}>
                Create Account
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`border-t ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-4 text-sm md:flex-row md:items-center md:justify-between">
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              (c) 2026 TODO FLOW. A steadier way to organize work.
            </p>
            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              Personal focus, team visibility, and clear execution in one flow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
