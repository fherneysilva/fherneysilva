import React, { Suspense, lazy } from "react";
import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import SidebarNav from "./components/SidebarNav";
import BackToTop from "./components/BackToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "./styles/Global.css";

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Blog = lazy(() => import("./components/Blog"));
const Siscodex = lazy(() => import("./components/Siscodex"));
const Credits = lazy(() => import("./components/Credits"));

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target section may still be loading (lazy-loaded below-fold
    // components), so retry until it's actually in the DOM instead of
    // relying on the browser's one-shot scroll-to-fragment on load.
    const id = hash.slice(1);
    let attempts = 0;
    let cancelled = false;
    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
      } else if (attempts < 30) {
        attempts++;
        requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />
      <SidebarNav />
      <BackToTop />
      <main id="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <Suspense fallback={null}>
                  <About />
                  <Experience />
                  <Projects />
                  <Blog />
                  <Siscodex />
                  <Credits />
                </Suspense>
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
