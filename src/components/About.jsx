import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";
import { FaJava, FaAws } from "react-icons/fa";
import { SiSpringboot, SiTerraform, SiDocker, SiAngular } from "react-icons/si";

const techIcons = {
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  AWS: FaAws,
  Terraform: SiTerraform,
  Docker: SiDocker,
  Angular: SiAngular,
};

const About = () => {
  const { t } = useLanguage();

  const one = (
    <p>
      {t.about.paragraphOne.map((segment, i) =>
        segment.highlight ? (
          <span key={i} className="highlight">
            {segment.text}
          </span>
        ) : segment.bold ? (
          <b key={i}>{segment.text}</b>
        ) : (
          segment.text
        )
      )}
    </p>
  );
  const two = <p>{t.about.paragraphTwo}</p>;

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">{t.about.sectionTitle}</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {one}
            {t.about.techIntro}
            <ul className="tech-stack">
              {t.about.techStack.map((techItem, i) => {
                const Icon = techIcons[techItem];
                return (
                  <FadeInSection as="li" key={i} delay={(i + 1) * 100 + "ms"}>
                    {Icon && <Icon className="tech-icon" aria-hidden="true" />}
                    <span>{techItem}</span>
                  </FadeInSection>
                );
              })}
            </ul>
            {two}
          </div>
          <div className="about-image">
            <img alt={t.about.imageAlt} src="/assets/fher.jpg" width="480" height="640" />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
