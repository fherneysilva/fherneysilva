import React from "react";

import "../styles/SidebarNav.css";
import FadeInSection from "./FadeInSection";

import { useMediaQuery } from "@mui/material";
import { useLanguage } from "../i18n/useLanguage";
import SiscodexNavLabel from "./SiscodexNavLabel";

const SidebarNav = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { t } = useLanguage();
  const links = [
    <a key="1" href="#intro"><span className="nav-slash">/</span>{t.nav.home.toLowerCase()}</a>,
    <a key="2" href="#about"><span className="nav-slash">/</span>{t.nav.about.toLowerCase()}</a>,
    <a key="3" href="#experience"><span className="nav-slash">/</span>{t.nav.experience.toLowerCase()}</a>,
    <a key="4" href="#projects"><span className="nav-slash">/</span>{t.nav.software.toLowerCase()}</a>,
    <a key="5" href="#blog"><span className="nav-slash">/</span>{t.nav.blog.toLowerCase()}</a>,
    <a key="6" href="#siscodex"><span className="nav-slash">/</span><SiscodexNavLabel text={t.nav.siscodex.toLowerCase()} /></a>,
  ];

  return (
    <div className="sidebar-nav">
      {!isMobile && (
        <div className="sidebar-links">
          {links.map((link, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <div>{link}</div>
            </FadeInSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNav;
