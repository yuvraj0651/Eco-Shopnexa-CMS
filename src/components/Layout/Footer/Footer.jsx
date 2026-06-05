import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        
        {/* LEFT */}
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Eco Shopnexa CMS
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Modern Ecommerce Admin Dashboard System.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400">
            Dashboard
          </button>

          <button className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400">
            Products
          </button>

          <button className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400">
            Orders
          </button>

          <button className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400">
            Customers
          </button>

          <button className="text-sm font-medium text-slate-500 transition-all duration-300 hover:text-emerald-600 dark:text-slate-400">
            Analytics
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 Eco Shopnexa.
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-sm text-slate-500 dark:text-slate-400">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;