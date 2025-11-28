'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container max-w-[680px] lg:max-w-[900px] mt-6 lg:mt-10 flex flex-row items-center gap-4 justify-between">
      <div className="flex flex-row items-center tracking-tight gap-4 md:gap-6"></div>
      <div className="flex flex-row items-center gap-4 md:gap-6">
        {isClient ? (
          <button
            type="button"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            className="group relative p-2 rounded-lg transition-all duration-300 hover:bg-primary/10"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'dark' ? (
              <SunIcon
                size={18}
                className="transition-all duration-300 group-hover:rotate-90 group-hover:text-primary"
              />
            ) : (
              <MoonIcon
                size={18}
                className="transition-all duration-300 group-hover:-rotate-12 group-hover:text-primary"
              />
            )}

            {/* Animated ring on hover */}
            <span className="absolute inset-0 rounded-lg ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
