import React from "react";
import "../styles/Blog.css";
import { FiFeather } from "react-icons/fi";
import FadeInSection from "./FadeInSection";
import { useLanguage } from "../i18n/useLanguage";

const Blog = () => {
  const { t } = useLanguage();

  return (
    <div id="blog">
      <FadeInSection>
        <div className="section-header">
          <span className="section-title">{t.blog.sectionTitle}</span>
        </div>
        <a
          href={t.blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card"
        >
          <div className="blog-icon">
            <FiFeather size={32} />
          </div>
          <div className="blog-body">
            <span className="blog-eyebrow">{t.blog.eyebrow}</span>
            <p className="blog-text">{t.blog.text}</p>
            <div className="blog-tags">
              {t.blog.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="blog-cta">{t.blog.cta} →</span>
          </div>
        </a>
      </FadeInSection>
    </div>
  );
};

export default Blog;
