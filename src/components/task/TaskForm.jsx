import { useState } from "react";



function TaskForm({ onSave, editingTask, onCancel , loading}) {

  const [formData, setFormData] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    status: editingTask?.status || "TODO",
    priority: editingTask?.priority || "MEDIUM",
    assignedTo: editingTask?.assignedTo || ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave(formData);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <h2>
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <input
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        disabled={loading}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>

      <input
        name="assignedTo"
        placeholder="Assigned To"
        value={formData.assignedTo}
        onChange={handleChange}
        disabled={loading}
      />

      {/* <button type="submit">
        Save
      </button> */}

       <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? editingTask
            ? "Updating..."
            : "Creating..."
          : editingTask
            ? "Update"
            : "Save"
        }
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </button>

    </form>
  );
}

export default TaskForm;