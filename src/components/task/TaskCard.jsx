function TaskCard({ task, onDelete , onEdit}) {
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

      <button onClick={() => onEdit(task)}>
        Edit
      </button>

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>

    </div>
  );
}

export default TaskCard;