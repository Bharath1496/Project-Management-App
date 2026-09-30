function TaskCard({ task, onDelete }) {
  return (
    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status: {task.status}
      </p>

      <p>
        Priority: {task.priority}
      </p>

      <p>
        Assigned To: {task.assignedTo}
      </p>

      <button>
        Edit
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>

    </div>
  );
}

export default TaskCard;