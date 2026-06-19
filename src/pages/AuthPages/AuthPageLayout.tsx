import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0">
        
        {children}

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gradient-to-br from-brand-900 via-brand-950 to-black dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1 px-6">
            
            {/* Grid background */}
            <GridShape />

            {/* Glow effect */}
            <div className="absolute w-72 h-72 bg-brand-500/20 blur-3xl rounded-full"></div>

            <div className="flex flex-col items-center max-w-sm text-center">
              
              {/* Logo */}
              <Link to="/" className="block mb-6">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo.svg"
                  alt="Urlwebwala Logo"
                 
                  className="h-14 w-auto object-contain drop-shadow-2xl contrast-150"
                />
              </Link>

              {/* Heading */}
              <h2 className="text-2xl font-semibold text-white mb-3">
                Smart Admin Dashboard
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                Built by <span className="text-brand-400 font-medium">Urlwebwala IT Company</span>, 
                this modern admin panel helps you manage applications, users, 
                analytics, and business operations efficiently with a clean 
                and scalable UI powered by Tailwind CSS.
              </p>

              {/* Extra tagline */}
              <p className="mt-4 text-xs text-gray-400">
                Secure • Fast • Developer Friendly
              </p>

            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>

      </div>
    </div>
  );
}