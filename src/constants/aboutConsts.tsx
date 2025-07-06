import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDatabase,
  FaGitlab,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiExpress,
  SiRedux,
  SiPrisma,
  SiSequelize,
  SiTypeorm,
} from "react-icons/si";

import type { ISkill, IExperience } from "../interface/skillInterface";
import MaterialUIIcon from "../assets/icons/MaterialUIIcon";

export const skills: ISkill[] = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "React", icon: <FaReact className="text-cyan-500" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
  { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-700" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-700" /> },
  { name: "SQL", icon: <FaDatabase className="text-gray-800" /> },
  { name: "Prisma ORM", icon: <SiPrisma className="text-gray-800" /> },
  { name: "TypeORM", icon: <SiTypeorm className="text-red-600" /> },
  { name: "Sequelize", icon: <SiSequelize className="text-blue-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
  { name: "Material UI", icon: <MaterialUIIcon /> },

  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "GitLab", icon: <FaGitlab className="text-orange-600" /> },
];

export const experiences: IExperience[] = [
  {
    title: "Frontend Developer",
    company: "ABC Tech",
    duration: "2021 - Present",
    details: "Built beautiful UI using React, TypeScript, and Tailwind.",
  },
  {
    title: "Backend Developer",
    company: "XYZ Solutions",
    duration: "2019 - 2021",
    details: "Created REST APIs and managed backend with Node.js and Express.",
  },
];
