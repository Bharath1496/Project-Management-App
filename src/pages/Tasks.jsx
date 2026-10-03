import { useSelector , useDispatch} from "react-redux";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import {
  fetchTasks,
  createTask
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

  const searchRef = useRef(null);

  const [theme, setTheme] = useState("light");

  const tasks = useSelector((state) => state.tasks.tasks);

  const loading = useSelector((state) => state.tasks.loading);

  const createLoading = useSelector(
    (state) => state.tasks.createLoading
  );

  const createError = useSelector(
    (state) => state.tasks.createError
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    }, [dispatch]);

  const tasksPerPage = 2;

// Removing local state mgmt
//   const handleDelete = useCallback((id) => {
//     dispatch(deleteTask(id));
//     }, [dispatch]);

    const handleEdit = useCallback((task) => {
    setEditingTask(task);
    setShowForm(true);
    }, []);

    function focusSearch() {
        searchRef.current.focus();
    }
    
    const sortedTasks = useMemo(() => {
        const filtered = tasks
            .filter((task) =>
            task.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((task) =>
            statusFilter === "ALL" ? true : task.status === statusFilter
            )
            .filter((task) =>
            priorityFilter === "ALL" ? true : task.priority === priorityFilter
            );

        return [...filtered].sort((a, b) => {
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
    }, [tasks, search, statusFilter, priorityFilter, sortBy]);

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

    async function handleSaveTask(formData) {

    if (editingTask) {
        // Update will be implemented separately.
        return;
    }

    try {

        await dispatch(createTask(formData)).unwrap();

        setShowForm(false);
        setEditingTask(null);

        } catch (error) {
            console.error("Create task failed:", error);
        }
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
            loading={createLoading}
        />
      )}

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Change Theme
    </button>

      <div className="task-controls">

      <input
            ref={searchRef}
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />

        <button onClick={focusSearch}>
            Focus Search
        </button>

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
                // onDelete={handleDelete}
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