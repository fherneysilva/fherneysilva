import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FiFeather } from "react-icons/fi";
import "../styles/NavBar.css";
import { useLanguage } from "../i18n/useLanguage";
import SiscodexNavLabel from "./SiscodexNavLabel";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollPos = useRef(0);
  const { t, language, toggleLanguage } = useLanguage();

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
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [expanded]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="navbar"
      data-bs-theme="dark"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Navbar.Brand href="/">Fherney Silva</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href="/#intro">{t.nav.home}</Nav.Link>
            <Nav.Link href="/#about">{t.nav.about}</Nav.Link>
            <Nav.Link href="/#experience">{t.nav.experience}</Nav.Link>
            <Nav.Link href="/#projects">{t.nav.software}</Nav.Link>
            <Nav.Link href="/#blog">{t.nav.blog}</Nav.Link>
            <Nav.Link href="/#siscodex">
              <SiscodexNavLabel text={t.nav.siscodex} />
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center" onSelect={() => setExpanded(false)}>
            <Nav.Link href="mailto:fherneysilva13@gmail.com">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
