import { useState } from "react";



function TaskForm({ onSave, editingTask, onCancel }) {

  const [formData, setFormData] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    status: editingTask?.status || "TODO",
    priority: editingTask?.priority || "MEDIUM",
    assignedTo: editingTask?.assignedTo || ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
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
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
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
      />

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>

    </form>
  );
}

export default TaskForm;