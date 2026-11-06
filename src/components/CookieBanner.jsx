import React, { useState, useEffect } from "react";
import "../styles/CookieBanner.css";
import { useLanguage } from "../i18n/useLanguage";
import { loadAnalytics } from "../utils/analytics";

const STORAGE_KEY = "cookie-consent";

const getInitialVisibility = () => {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored !== "accepted" && stored !== "rejected";
};

const CookieBanner = ({ onOpenPrivacy }) => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(getInitialVisibility);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "accepted") {
      loadAnalytics();
    }
  }, []);

  // The banner is fixed to the bottom of the viewport, which otherwise
  // covers the footer (and its privacy/terms links) while it's open.
  useEffect(() => {
    document.body.classList.toggle("cookie-banner-open", visible);
    return () => document.body.classList.remove("cookie-banner-open");
  }, [visible]);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    loadAnalytics();
    setVisible(false);
  };

  const decline = () => {
    window.localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="region" aria-label={t.cookieBanner.ariaLabel}>
      <p className="cookie-banner-text">
        {t.cookieBanner.text}{" "}
        <button type="button" className="cookie-banner-link" onClick={onOpenPrivacy}>
          {t.cookieBanner.moreInfo}
        </button>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-decline" onClick={decline}>
          {t.cookieBanner.decline}
        </button>
        <button type="button" className="cookie-banner-accept" onClick={accept}>
          {t.cookieBanner.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
