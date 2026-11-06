import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./context";

const STORAGE_KEY = "portfolio-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Many components transition background-color/border-color on hover
    // (e.g. .projects-card), and that same transition fires when the
    // underlying CSS variable changes on a theme switch, making every card
    // crossfade instead of flipping instantly. Briefly disable all
    // transitions site-wide so the theme change itself is instant, then
    // re-enable them (after a repaint) so hover/etc. stay smooth.
    const root = document.documentElement;
    root.classList.add("theme-transition-off");
    root.setAttribute("data-theme", theme);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("theme-transition-off");
      });
    });
    return () => cancelAnimationFrame(id);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
