import React from "react";
import "../styles/Siscodex.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";

const Siscodex = () => {
  const { t } = useLanguage();

  return (
    <div id="siscodex">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">{t.siscodex.sectionTitle}</span>
        </div>
        <div className="siscodex-card">
          <div className="siscodex-card-header">
            <img
              className="siscodex-logo"
              src="/assets/siscodex-nbg-trimmed.png"
              alt={t.siscodex.heading}
            />
            <span className="siscodex-badge">
              <span className="siscodex-badge-dot" />
              {t.siscodex.badge}
            </span>
          </div>
          <p className="siscodex-text">{t.siscodex.text}</p>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Siscodex;
