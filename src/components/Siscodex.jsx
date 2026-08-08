import React from "react";
import "../styles/Siscodex.css";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";
import { trackEvent } from "../utils/analytics";
import { FiUsers, FiCloud, FiTrendingUp, FiAward, FiCode, FiServer, FiRefreshCw } from "react-icons/fi";

const whyIcons = [FiUsers, FiCloud, FiTrendingUp, FiAward];
const serviceIcons = [FiCode, FiServer, FiRefreshCw];

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
              src={`${import.meta.env.BASE_URL}assets/siscodex-nbg-trimmed.png`}
              alt={t.siscodex.heading}
              width="560"
              height="58"
            />
            <span className="siscodex-badge">
              <span className="siscodex-badge-dot" />
              {t.siscodex.badge}
            </span>
          </div>
          {t.siscodex.text.map((paragraph, i) => (
            <p className="siscodex-text" key={i}>
              {paragraph}
            </p>
          ))}
          <div className="siscodex-offer">
            <span className="siscodex-services-label">{t.siscodex.servicesLabel}</span>
            <div className="siscodex-offer-grid">
              {t.siscodex.services.map((service, i) => {
                const Icon = serviceIcons[i];
                return (
                  <div className="siscodex-offer-card" key={service.title}>
                    <Icon className="siscodex-offer-icon" />
                    <p className="siscodex-offer-title">{service.title}</p>
                    <p className="siscodex-offer-desc">{service.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="siscodex-services">
            <span className="siscodex-services-label">{t.siscodex.whyLabel}</span>
            <div className="siscodex-why-grid">
              {t.siscodex.why.map((item, i) => {
                const Icon = whyIcons[i];
                return (
                  <div className="siscodex-service" key={item.title}>
                    <Icon className="siscodex-service-icon" />
                    <div>
                      <p className="siscodex-service-title">{item.title}</p>
                      <p className="siscodex-service-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="siscodex-roadmap">
            <span className="siscodex-services-label">{t.siscodex.processLabel}</span>
            <div className="siscodex-roadmap-track">
              {t.siscodex.process.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="siscodex-process-step">
                    <span className="siscodex-process-dot">{i + 1}</span>
                    <span className="siscodex-roadmap-text">{step}</span>
                  </div>
                  {i < t.siscodex.process.length - 1 && (
                    <span className="siscodex-roadmap-line siscodex-roadmap-line--done" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="siscodex-cta">
            <p className="siscodex-cta-text">{t.siscodex.ctaText}</p>
            <a
              className="siscodex-cta-button"
              href="mailto:fherneysilva13@gmail.com"
              onClick={() => trackEvent("contact_click", { location: "siscodex" })}
            >
              {t.siscodex.ctaButton}
            </a>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Siscodex;
