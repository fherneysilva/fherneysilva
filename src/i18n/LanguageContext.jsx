import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import content from "./content";
import { LanguageContext } from "./context";

const STORAGE_KEY = "portfolio-lang";

const getInitialLanguage = () => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "es" ? "es" : "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "es" : "en";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = {
    language,
    toggleLanguage,
    t: content[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node,
};
