"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import projectsData from "../data/projects.json";
import { useLanguage } from "../contexts/LanguageContext";
import ProjectDetailModal from "./ProjectDetailModal";
import type { Project } from "../types/project";

// Translations for projects section
const translations = {
  en: {
    sectionTitle: "Featured Projects",
    sectionDescription:
      "Explore our diverse portfolio of custom software solutions deployed across multiple platforms and industries.",
    github: "GitHub",
    liveDemo: "Live Demo",
    viewDetails: "View details",
    comingSoonTitle: "Coming Soon",
    comingSoonDesc:
      "Our featured projects are currently under development. Check back soon to see our latest work!",
  },
  es: {
    sectionTitle: "Proyectos Destacados",
    sectionDescription:
      "Explora nuestro diverso portafolio de soluciones de software personalizadas implementadas en múltiples plataformas e industrias.",
    github: "GitHub",
    liveDemo: "Demo en Vivo",
    viewDetails: "Ver detalles",
    comingSoonTitle: "Próximamente",
    comingSoonDesc:
      "Nuestros proyectos destacados están actualmente en desarrollo. ¡Vuelve pronto para ver nuestro trabajo más reciente!",
  },
};

const projectsDataTyped: Project[] = projectsData as Project[];
const projects = projectsDataTyped
  .filter((project) => project.featured)
  .slice(0, 6);
// Filter only featured projects or adjust count as needed

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 relative" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.sectionTitle}
          </h2>
          <p className="text-xl text-text/80 max-w-2xl mx-auto">
            {t.sectionDescription}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleProjectClick(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                className="group cursor-pointer bg-background/30 backdrop-blur-lg rounded-xl overflow-hidden border border-primary/20 shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/30">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/70">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  {project.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs bg-background/60 backdrop-blur text-text rounded-full capitalize">
                      {project.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-text">
                    {project.title}
                  </h3>
                  <p className="text-text/80 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-primary/20 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-text hover:text-accent transition-colors"
                        >
                          <FaGithub /> {t.github}
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-text hover:text-accent transition-colors"
                        >
                          <FaExternalLinkAlt /> {t.liveDemo}
                        </a>
                      )}
                    </div>
                    <span className="text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.viewDetails} →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center justify-center py-16"
            >
              <div className="glassmorphism rounded-full p-8 mb-6">
                <FaClock className="text-6xl text-primary/70 animate-pulse" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text text-center mb-4">
                {t.comingSoonTitle}
              </h3>
              <p className="text-xl text-text/80 text-center max-w-md">
                {t.comingSoonDesc}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ProjectsSection;
