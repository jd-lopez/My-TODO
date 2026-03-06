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

      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
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

      <section id="workflow" className="mx-auto w-full max-w-6xl px-6 pb-16">
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

      <section id="get-started" className="mx-auto w-full max-w-6xl px-6 pb-20">
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
    </div>
  );
}
