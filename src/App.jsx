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
    window.scrollTo(0, 0);
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
