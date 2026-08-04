import React, { useState, useEffect } from "react";
import "../styles/BackToTop.css";
import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "../i18n/useLanguage";

const BackToTop = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top-fab${visible ? " back-to-top-fab--visible" : ""}`}
      onClick={scrollToTop}
      title={t.credits.backToTop}
      aria-label={t.credits.backToTop}
    >
      <FiArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
