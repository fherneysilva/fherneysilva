import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";

const ProjectGrid = ({ title, items }) => (
  <div className="project-container">
    <div className="projects-group-title">{title}</div>
    <ul className="projects-grid">
      {items.map((project, i) => (
        <FadeInSection as="li" className="projects-card" key={project.id} delay={(i + 1) * 100 + "ms"}>
          <div className="card-header">
            <div className="folder-icon">
              <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
            </div>
          </div>

          <div className="card-title">{project.title}</div>
          <div className="card-desc">{project.desc}</div>
          <div className="card-tech">{project.techStack}</div>
        </FadeInSection>
      ))}
    </ul>
  </div>
);

const Projects = () => {
  const { t } = useLanguage();

  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">{t.projects.sectionTitle}</span>
      </div>
      <ProjectGrid title={t.projects.groupCloudTitle} items={t.projects.cloud} />
      <ProjectGrid
        title={t.projects.groupFreelanceTitle}
        items={t.projects.freelance}
      />
    </div>
  );
};

export default Projects;
