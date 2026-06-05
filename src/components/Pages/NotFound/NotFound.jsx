import React from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoHomeOutline,
  IoArrowBackOutline,
  IoGlobeOutline,
} from "react-icons/io5";

const NotFound = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Main Wrapper */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              Page Not Found
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Lost In The <br />
              Digital Space
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist, was removed,
              or may have been moved to another route.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/"
                className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
              >
                <IoHomeOutline className="text-lg" />
                Back To Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <IoArrowBackOutline className="text-lg" />
                Go Back
              </button>
            </div>

            {/* Bottom Info */}
            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-500">
                <IoGlobeOutline className="text-2xl" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Route Could Not Be Resolved
                </h3>

                <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  Double check the URL or navigate back to a valid page.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden min-h-[500px] overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-500 lg:flex lg:items-center lg:justify-center">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

            {/* Glass Card */}
            <div className="relative z-10 w-[420px] rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">
                    Route Status
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    Not Found
                  </h3>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white">
                  <IoSearchOutline className="text-3xl" />
                </div>
              </div>

              {/* Fake Bars */}
              <div className="mt-10 flex h-44 items-end gap-3">
                <div className="h-[20%] flex-1 rounded-t-3xl bg-white/20" />
                <div className="h-[35%] flex-1 rounded-t-3xl bg-white/30" />
                <div className="h-[50%] flex-1 rounded-t-3xl bg-white/40" />
                <div className="h-[70%] flex-1 rounded-t-3xl bg-cyan-300" />
                <div className="h-[90%] flex-1 rounded-t-3xl bg-cyan-200" />
              </div>

              {/* Mini Cards */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                  <p className="text-xs text-white/70">
                    Route
                  </p>

                  <h4 className="mt-2 text-xl font-bold text-white">
                    Missing
                  </h4>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                  <p className="text-xs text-white/70">
                    Status
                  </p>

                  <h4 className="mt-2 text-xl font-bold text-white">
                    404
                  </h4>
                </div>
              </div>
            </div>

            {/* 404 */}
            <h2 className="absolute bottom-6 right-8 text-[120px] font-black leading-none text-white/10">
              404
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;