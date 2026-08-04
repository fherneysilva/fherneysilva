import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import AsciiPortrait from "./AsciiPortrait";
import { useLanguage } from "../i18n/useLanguage";
import { trackEvent } from "../utils/analytics";

const Intro = () => {
  const { t } = useLanguage();

  return (
    <div id="intro">
      <div className="intro-block">
        <div className="intro-title">
          {t.intro.greeting}
          <span className="intro-name">
            <TypeAnimation
              sequence={[t.intro.name]}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          </span>
          <span className="intro-title-tail">
            {t.intro.nameSuffix}
            <span className="intro-cursor">|</span>
          </span>
        </div>
        <FadeInSection>
          <div className="intro-tagline">{t.intro.tagline}</div>
          <div className="intro-role">{t.intro.role}</div>
          <div className="intro-desc">{t.intro.desc}</div>
          <a
            href="mailto:fherneysilva13@gmail.com"
            className="intro-contact"
            onClick={() => trackEvent("contact_click", { location: "intro" })}
          >
            <EmailRoundedIcon />
            {" " + t.intro.contact}
          </a>
        </FadeInSection>
      </div>
      <div className="intro-simulation">
        <AsciiPortrait />
      </div>
    </div>
  );
};

export default Intro;
