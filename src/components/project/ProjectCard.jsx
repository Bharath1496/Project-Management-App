function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>

      <p>{project.description}</p>

      <p>
        Status: {project.status}
      </p>

      <button>View</button>
      <button>Edit</button>
    </div>
  );
}

export default ProjectCard;