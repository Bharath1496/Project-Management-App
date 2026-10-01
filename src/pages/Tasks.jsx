// function Tasks() {
//   return (
//     <div>
//       <h1>Tasks</h1>
//       <p>Manage your tasks here.</p>
//     </div>
//   );
// }

// export default Tasks;

import { useState , useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";

import {
  addTask,
  updateTask,
  deleteTask,
  fetchTasks
} from "../store/taskSlice";

import TaskCard from "../components/task/TaskCard";

import TaskForm from "../components/task/TaskForm";

function Tasks() {
    
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [sortBy, setSortBy] = useState("NONE");

  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const tasks = useSelector((state) => state.tasks.tasks);

  const loading = useSelector((state) => state.tasks.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    }, [dispatch]);

  const tasksPerPage = 2;

  
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "Design login page",
//       description: "Create UI for login screen",
//       status: "TODO",
//       priority: "HIGH",
//       assignedTo: "Bharath"
//     },
//     {
//       id: 2,
//       title: "Create authentication API",
//       description: "Implement login REST API",
//       status: "IN_PROGRESS",
//       priority: "HIGH",
//       assignedTo: "Rahul"
//     },
//     {
//       id: 3,
//       title: "Create database tables",
//       description: "Create PostgreSQL schema",
//       status: "COMPLETED",
//       priority: "MEDIUM",
//       assignedTo: "Bharath"
//     },
//     {
//       id: 4,
//       title: "Write documentation",
//       description: "Document project APIs",
//       status: "TODO",
//       priority: "LOW",
//       assignedTo: "Anil"
//     }
//   ]);

  function handleDelete(id) {
    // setTasks(
    //   tasks.filter((task) => task.id !== id)
    // );

    dispatch(deleteTask(id));
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

//   const filteredTasks = tasks.filter((task) =>
//   task.title.toLowerCase().includes(search.toLowerCase()));

    const filteredTasks = tasks
    .filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
        statusFilter === "ALL"
        ? true
        : task.status === statusFilter
    )
    .filter((task) =>
    priorityFilter === "ALL"
      ? true
      : task.priority === priorityFilter
    );

    const sortedTasks = [...filteredTasks].sort((a, b) => {

    if (sortBy === "TITLE") {
        return a.title.localeCompare(b.title);
    }

    if (sortBy === "PRIORITY") {
        const priorityOrder = {
        HIGH: 1,
        MEDIUM: 2,
        LOW: 3
        };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    return 0;
    });

    const totalPages = Math.ceil(
    sortedTasks.length / tasksPerPage
    );

    const startIndex =
    (currentPage - 1) * tasksPerPage;

    const paginatedTasks = sortedTasks.slice(
    startIndex,
    startIndex + tasksPerPage
    );

    function handleCreateTask() {
        setEditingTask(null);
        setShowForm(true);
    }

    function handleSaveTask(formData) {

        if (editingTask) {
            // setTasks(
            // tasks.map((task) =>
            //     task.id === editingTask.id
            //     ? { ...task, ...formData }
            //     : task
            // )
            // );
            dispatch(
                updateTask({
                    id: editingTask.id,
                    ...formData
                })
            );

        } else {

            const newTask = {
            id: Date.now(),
            ...formData
            };

            // setTasks([
            // ...tasks,
            // newTask
            // ]);
            dispatch(addTask(newTask));
        }

        setShowForm(false);
        setEditingTask(null);
    }

  return (
    <div>

      <h1>Tasks</h1>

      <button className="create-task-button" onClick={handleCreateTask}>
        + Create Task
        
      </button>

      {showForm && (
        <TaskForm
            editingTask={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
            }}
        />
      )}

      <div className="task-controls">

      <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

        <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
            <option value="ALL">All Statuses</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
        </select>

        <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
        >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
        </select>

        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value="NONE">Sort By</option>
            <option value="TITLE">Title</option>
            <option value="PRIORITY">Priority</option>
        </select>
      </div>
      {/* <div className="task-list">

        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
          />
        ))}

      </div> */}

      {loading ? (
        <p>Loading tasks...</p>
        ) : paginatedTasks.length === 0 ? (
        <p>No tasks found.</p>
        ) : (
        <div className="task-list">
            {paginatedTasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
            ))}
        </div>
        )}

         {/* Pagination goes HERE */}
        <div className="pagination">

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        <span>
            Page {currentPage} of {totalPages}
        </span>

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

    </div>

    </div>
  );
}

export default Tasks;