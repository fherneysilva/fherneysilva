import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FiFeather, FiSun, FiMoon } from "react-icons/fi";
import "../styles/NavBar.css";
import { useLanguage } from "../i18n/useLanguage";
import { useTheme } from "../theme/useTheme";
import SiscodexNavLabel from "./SiscodexNavLabel";
import { trackEvent } from "../utils/analytics";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollPos = useRef(0);
  const suppressRestore = useRef(false);
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (expanded) {
      scrollPos.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPos.current}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Closing because a nav link was tapped: let the browser navigate to
      // the target section instead of snapping back to where we were.
      if (scrollY && !suppressRestore.current) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
      suppressRestore.current = false;
    }
  }, [expanded]);

  const handleNavSelect = () => {
    suppressRestore.current = true;
    setExpanded(false);
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="navbar"
      data-bs-theme={theme}
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Navbar.Brand href="#intro">Fherney Silva</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={handleNavSelect}>
            <Nav.Link href="#intro">{t.nav.home}</Nav.Link>
            <Nav.Link href="#about">{t.nav.about}</Nav.Link>
            <Nav.Link href="#experience">{t.nav.experience}</Nav.Link>
            <Nav.Link href="#projects">{t.nav.software}</Nav.Link>
            <Nav.Link href="#blog">{t.nav.blog}</Nav.Link>
            <Nav.Link href="#siscodex">
              <SiscodexNavLabel text={t.nav.siscodex} />
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center" onSelect={() => setExpanded(false)}>
            <Nav.Link
              href="mailto:fherneysilva13@gmail.com"
              onClick={() => trackEvent("contact_click", { location: "navbar" })}
            >
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link
              href="https://github.com/fherneysilva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/fherneysilva/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>
            <Nav.Link
              href="https://fherneysilva.hashnode.dev/"
              target="_blank"
              rel="noopener noreferrer"
              title="Blog"
            >
              <FiFeather size={17} />
            </Nav.Link>
            <button
              type="button"
              className="lang-toggle-btn"
              onClick={toggleLanguage}
              title={language === "en" ? "Ver en español" : "View in English"}
            >
              {language === "en" ? "ES" : "EN"}
            </button>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
