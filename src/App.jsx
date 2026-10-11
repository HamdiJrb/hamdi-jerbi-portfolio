import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Work from './components/Work';
import ProjectModal from './components/ProjectModal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark selection:bg-primary/20 selection:text-primary transition-colors duration-300">
        {/* Sticky Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          <Home />
          <Work onSelectProject={handleOpenModal} />
          <Skills />
          <Experience />
          <About />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Project Detail Modal Overlay */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

