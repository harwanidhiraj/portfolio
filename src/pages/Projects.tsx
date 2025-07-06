import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetUserProjectsQuery } from "../redux/api/portfolioApi";
import type { IProject } from "../interface/projectInterface";

AOS.init();

const Projects = () => {
  const { data, isLoading, isError } = useGetUserProjectsQuery();
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const projects = data?.data || [];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center text-gray-800 mb-14"
          data-aos="fade-up"
        >
          My Projects
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load projects.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                data-aos="zoom-in"
                className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_28px_rgba(79,70,229,0.4)] transform hover:scale-[1.03] transition duration-300 cursor-pointer border border-indigo-100"
                onClick={() =>
                  setSelectedProject({
                    title: project.title,
                    description: project.description,
                    image: project.imageUrl,
                    github: project.gitHubUrl || "#",
                    demo: project.liveUrl || "#",
                    tech: project.tech.split(",").map((t) => t.trim()),
                  })
                }
              >
                <div className="overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(",").map((t, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white max-w-2xl w-full rounded-2xl p-8 shadow-2xl relative animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-red-500"
              >
                &times;
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="rounded-xl w-full h-64 object-cover mb-6 shadow"
              />

              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-gray-700 mb-4">
                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  <FaGithub className="text-lg" /> GitHub
                </a>
                <a
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                >
                  <FaExternalLinkAlt className="text-lg" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
