import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  IoRefreshOutline,
  IoHomeOutline,
  IoWarningOutline,
} from "react-icons/io5";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error?.message || "Something went wrong",
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
          {/* Background Blur */}
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Wrapper */}
          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Content */}
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Something Went Wrong
                </div>

                <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                  Oops! <br />
                  Unexpected Error.
                </h1>

                <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  Something unexpected happened while loading this page.
                  Don&apos;t worry — your data is safe. Try refreshing the page
                  or return back to the dashboard.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={this.handleReload}
                    className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600"
                  >
                    <IoRefreshOutline className="text-lg transition-transform duration-300 group-hover:rotate-180" />
                    Reload Page
                  </button>

                  <Link
                    to="/"
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <IoHomeOutline className="text-lg" />
                    Back To Home
                  </Link>
                </div>

                {/* Bottom Info */}
                <div className="mt-10 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                    <IoWarningOutline className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Error Boundary Activated
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">
                      The application prevented a full crash and safely
                      recovered this screen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative hidden min-h-[500px] overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-cyan-600 lg:flex lg:items-center lg:justify-center">
                {/* Floating Glow */}
                <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

                {/* Main Card */}
                <div className="relative z-10 w-[420px] rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70">
                        System Status
                      </p>

                      <h3 className="mt-2 text-3xl font-black text-white">
                        Error Detected
                      </h3>
                    </div>

                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white">
                      <IoWarningOutline className="text-3xl" />
                    </div>
                  </div>

                  {/* Fake Graph */}
                  <div className="mt-10 flex h-44 items-end gap-3">
                    <div className="h-[40%] flex-1 rounded-t-3xl bg-white/20" />
                    <div className="h-[55%] flex-1 rounded-t-3xl bg-white/30" />
                    <div className="h-[70%] flex-1 rounded-t-3xl bg-white/40" />
                    <div className="h-[35%] flex-1 rounded-t-3xl bg-red-400" />
                    <div className="h-[20%] flex-1 rounded-t-3xl bg-red-500" />
                  </div>

                  {/* Mini Status Cards */}
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                      <p className="text-xs text-white/70">Recovery</p>

                      <h4 className="mt-2 text-xl font-bold text-white">
                        Active
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-lg">
                      <p className="text-xs text-white/70">Stability</p>

                      <h4 className="mt-2 text-xl font-bold text-white">
                        Secured
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 500 Text */}
                <h2 className="absolute bottom-6 right-8 text-[120px] font-black leading-none text-white/10">
                  500
                </h2>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;