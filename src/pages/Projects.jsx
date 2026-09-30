// function Projects() {
//   return (
//     <div>
//       <h1>Projects</h1>
//       <p>Manage your projects here.</p>
//     </div>
//   );
// }

// export default Projects;


import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";

function Projects() {

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce App",
      description: "Online shopping platform",
      status: "Active"
    },
    {
      id: 2,
      name: "HR Management",
      description: "Employee management system",
      status: "Completed"
    },
    {
      id: 3,
      name: "Banking Application",
      description: "Digital banking platform",
      status: "Active"
    }
  ]);

  return (
    <div>

      <h1>Projects</h1>

      <button>
        + Create Project
      </button>

      <div className="project-list">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}

      </div>

    </div>
  );
}

export default Projects;