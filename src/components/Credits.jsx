import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";

const Credits = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <FadeInSection>
      <div id="credits">
        <div className="ending-credits">
          <div>{t.credits.line1}</div>
          <div>{t.credits.line2.replace("{year}", year)}</div>
        </div>
      </div>
    </FadeInSection>
  );
};

export default Credits;
