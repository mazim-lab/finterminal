"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

// Three-way toggle, same cycle as FAEConf: system, light, dark.
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="icon-btn" aria-hidden="true" />;

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <button type="button" onClick={cycle} className="icon-btn" title={`Theme: ${label}`} aria-label={`Theme: ${label}. Click to change.`}>
      <Icon aria-hidden="true" />
    </button>
  );
}
