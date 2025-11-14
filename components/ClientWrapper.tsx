"use client";

import { useState } from "react";
import Link from "next/link";
import NavMenu from "@/components/NavMenu";

interface ClientWrapperProps {
  children: React.ReactNode;
  siteTitle: string;
  siteDescription: string;
}

export default function ClientWrapper({ children, siteTitle, siteDescription }: ClientWrapperProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link
                href="/"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {siteTitle}
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {siteDescription}
              </p>
            </div>
            {/* Desktop Nav  */}
            <NavMenu orientation="horizontal" className="hidden md:flex" />
            {/* Mobile Nav (inside mobile menu) */}
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t">
            <NavMenu
              orientation="vertical"
              onLinkClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </header>
      {children}
    </div>
  );
}
