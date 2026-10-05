"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaBehance,
  FaFigma,
  FaVimeoV,
  FaCode,
} from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchReadme } from "../lib/github";
import type { Project } from "../types/project";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "overview" | "readme" | "media";

const translations = {
  en: {
    overview: "Overview",
    readme: "README",
    media: "Media & Links",
    technologies: "Technologies",
    highlights: "Key Highlights",
    viewOnGithub: "View on GitHub",
    liveDemo: "Live Demo",
    loadingReadme: "Loading README...",
    noReadme: "No README found for this repository.",
    screenshots: "Screenshots",
    videos: "Videos",
    demonstration: "Project Demonstration",
    interactivePrototype: "Interactive Prototype",
    presentation: "Project Presentation",
    additionalLinks: "Additional Links",
    behance: "Behance Portfolio",
    behanceDesc: "View design portfolio",
    watchOnVimeo: "Watch on Vimeo",
    openInFigma: "Open in Figma",
    demoVideo: "Demo Video",
    noMedia: "No additional media or links configured for this project.",
  },
  es: {
    overview: "Resumen",
    readme: "README",
    media: "Multimedia y Enlaces",
    technologies: "Tecnologías",
    highlights: "Aspectos Destacados",
    viewOnGithub: "Ver en GitHub",
    liveDemo: "Demo en Vivo",
    loadingReadme: "Cargando README...",
    noReadme: "No se encontró README para este repositorio.",
    screenshots: "Capturas",
    videos: "Videos",
    demonstration: "Demostración del Proyecto",
    interactivePrototype: "Prototipo Interactivo",
    presentation: "Presentación del Proyecto",
    additionalLinks: "Enlaces Adicionales",
    behance: "Portafolio de Behance",
    behanceDesc: "Ver portafolio de diseño",
    watchOnVimeo: "Ver en Vimeo",
    openInFigma: "Abrir en Figma",
    demoVideo: "Video de Demostración",
    noMedia:
      "No hay multimedia ni enlaces adicionales configurados para este proyecto.",
  },
};

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="text-text/80 mb-4 leading-relaxed">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-text/90">{children}</em>,
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-text mb-6 mt-8">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-text mb-4 mt-6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-text mb-3 mt-4">{children}</h3>
  ),
  ul: ({ children }) => (
    <ul className="text-text/80 mb-4 list-disc list-inside space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-text/80 mb-4 list-decimal list-inside space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-text/80">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:text-accent/80 underline"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent/50 pl-4 my-4 text-text/80 italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (!isBlock) {
      return (
        <code className="bg-primary/10 px-2 py-1 rounded text-sm font-mono text-accent border border-primary/20">
          {children}
        </code>
      );
    }
    return (
      <div className="relative my-6">
        <div className="bg-background/60 border border-primary/20 rounded-lg overflow-hidden">
          <pre className="p-4 overflow-x-auto text-sm text-text/80 font-mono leading-relaxed">
            <code>{String(children).replace(/\n$/, "")}</code>
          </pre>
        </div>
      </div>
    );
  },
};

const ProjectDetailModal = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [readme, setReadme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    if (project && isOpen) {
      setActiveTab("overview");
      setReadme(null);
      if (!project.repoName) return;

      setLoading(true);
      fetchReadme(project.repoName)
        .then(setReadme)
        .finally(() => setLoading(false));
    }
  }, [project, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const tabs: Tab[] = ["overview", "readme", "media"];

  const hasMedia =
    project.vimeoVideoId ||
    (project.vimeoVideoIds && project.vimeoVideoIds.length > 0) ||
    project.figmaUrl ||
    project.figmaDeckUrl ||
    project.behanceUrl ||
    (project.links && project.links.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] glassmorphism-card overflow-hidden"
          >
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <div className="p-6 border-b border-primary/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-text">
                        {project.title}
                      </h2>
                      {project.category && (
                        <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full capitalize">
                          {project.category}
                        </span>
                      )}
                    </div>

                    <p className="text-text/80 mb-4">{project.description}</p>

                    {project.language && (
                      <div className="flex items-center gap-2 text-sm text-text/60">
                        <span className="w-3 h-3 rounded-full bg-accent" />
                        <span>{project.language}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-text transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "bg-primary/10 text-text/70 hover:bg-primary/20"
                      }`}
                    >
                      {t[tab]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {project.technologies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.technologies}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm bg-primary/10 text-text rounded-lg border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.highlights && project.highlights.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.highlights}
                        </h3>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-text/80"
                            >
                              <span className="text-accent mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.overview && (
                      <div>
                        <ReactMarkdown components={markdownComponents}>
                          {project.overview}
                        </ReactMarkdown>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-text rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <FaGithub /> {t.viewOnGithub}
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                        >
                          <FaExternalLinkAlt /> {t.liveDemo}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "readme" && (
                  <div className="prose-invert max-w-none">
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
                      </div>
                    ) : readme ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {readme}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-text/60 text-center py-12">
                        {t.noReadme}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "media" && (
                  <div className="space-y-6">
                    {(project.vimeoVideoId || project.vimeoVideoIds) && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.demonstration}
                        </h3>
                        <div className="space-y-4">
                          {(project.vimeoVideoIds ||
                            (project.vimeoVideoId
                              ? [project.vimeoVideoId]
                              : [])
                          ).map((videoId, index) => (
                            <div
                              key={videoId}
                              className="bg-background/40 border border-primary/20 rounded-lg overflow-hidden"
                            >
                              <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20">
                                <div className="flex items-center gap-2">
                                  <FaVimeoV className="text-accent" />
                                  <span className="text-xs text-text/60 font-medium">
                                    {project.vimeoVideoIds
                                      ? `${t.demoVideo} ${index + 1}`
                                      : t.demoVideo}
                                  </span>
                                </div>
                                <a
                                  href={`https://vimeo.com/${videoId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-accent hover:text-accent/80 transition-colors"
                                >
                                  {t.watchOnVimeo}
                                </a>
                              </div>
                              <div
                                className="relative w-full"
                                style={{ padding: "56.25% 0 0 0" }}
                              >
                                <iframe
                                  src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=${
                                    index === 0 ? 1 : 0
                                  }&muted=1&loop=1`}
                                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  className="absolute inset-0 w-full h-full"
                                  title={`${t.demoVideo} ${index + 1}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {project.figmaUrl && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.interactivePrototype}
                        </h3>
                        <div className="bg-background/40 border border-primary/20 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20">
                            <div className="flex items-center gap-2">
                              <FaFigma className="text-accent" />
                              <span className="text-xs text-text/60 font-medium">
                                Figma
                              </span>
                            </div>
                            <a
                              href={project.figmaUrl
                                .replace(
                                  "embed.figma.com/proto/",
                                  "www.figma.com/proto/"
                                )
                                .replace(
                                  "embed.figma.com/deck/",
                                  "www.figma.com/deck/"
                                )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                              {t.openInFigma}
                            </a>
                          </div>
                          <div className="aspect-[16/9] w-full">
                            <iframe
                              src={project.figmaUrl}
                              className="w-full h-full"
                              allowFullScreen
                              title={t.interactivePrototype}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {project.figmaDeckUrl && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.presentation}
                        </h3>
                        <div className="bg-background/40 border border-primary/20 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20">
                            <div className="flex items-center gap-2">
                              <FaFigma className="text-accent" />
                              <span className="text-xs text-text/60 font-medium">
                                Figma
                              </span>
                            </div>
                            <a
                              href={project.figmaDeckUrl
                                .replace(
                                  "embed.figma.com/deck/",
                                  "www.figma.com/deck/"
                                )
                                .replace(
                                  "embed.figma.com/proto/",
                                  "www.figma.com/proto/"
                                )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                              {t.openInFigma}
                            </a>
                          </div>
                          <div className="aspect-[16/9] w-full">
                            <iframe
                              src={project.figmaDeckUrl}
                              className="w-full h-full"
                              allowFullScreen
                              title={t.presentation}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {(project.behanceUrl ||
                      (project.links && project.links.length > 0)) && (
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-3">
                          {t.additionalLinks}
                        </h3>
                        <div className="space-y-3">
                          {project.behanceUrl && (
                            <a
                              href={project.behanceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                            >
                              <FaBehance className="w-5 h-5 text-accent" />
                              <div>
                                <div className="text-text font-medium">
                                  {t.behance}
                                </div>
                                <div className="text-text/60 text-sm">
                                  {t.behanceDesc}
                                </div>
                              </div>
                            </a>
                          )}
                          {project.links?.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                            >
                              <FaCode className="w-5 h-5 text-accent" />
                              <div>
                                <div className="text-text font-medium">
                                  {link.title}
                                </div>
                                {link.description && (
                                  <div className="text-text/60 text-sm">
                                    {link.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {!hasMedia && (
                      <p className="text-text/60 text-center py-12">
                        {t.noMedia}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
