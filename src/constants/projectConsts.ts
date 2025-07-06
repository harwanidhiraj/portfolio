import type { IProject } from "../interface/projectInterface";

export const projectList: IProject[] = [
  {
    title: "Portfolio Website",
    description:
      "A fully responsive personal portfolio built with React, TypeScript, and Tailwind CSS showcasing my skills, projects, and resume.",
    image: "https://source.unsplash.com/random/800x600?portfolio",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourportfolio.com",
  },
  {
    title: "E-Commerce Store",
    description:
      "A full-stack shopping website with product filtering, cart management, and admin dashboard using React, Node.js, and MongoDB.",
    image: "https://source.unsplash.com/random/800x600?ecommerce",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/yourname/ecommerce",
    demo: "https://yourecommerce.com",
  },
  {
    title: "Blog Platform",
    description:
      "A clean blog platform with markdown editor, SEO support, and dynamic routing using Next.js and PostgreSQL.",
    image: "https://source.unsplash.com/random/800x600?blog",
    tech: ["Next.js", "PostgreSQL"],
    github: "https://github.com/yourname/blog",
    demo: "https://yourblogsite.com",
  },
];
