import {
  useSelector,
  useDispatch
} from "react-redux";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from "react";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask
} from "../store/taskSlice";

import TaskCard from "../components/task/TaskCard";

import TaskForm from "../components/task/TaskForm";

import useDebounce from "../hooks/useDebounce";

function Tasks() {

  // =====================================================
  // LOCAL UI STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [sortBy, setSortBy] = useState("NONE");

  const [currentPage, setCurrentPage] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [theme, setTheme] = useState("light");

  const searchRef = useRef(null);


  // =====================================================
  // REDUX STATE
  // =====================================================

  const tasks = useSelector(
    (state) => state.tasks.tasks
  );


  const loading = useSelector(
    (state) => state.tasks.loading
  );


  const createLoading = useSelector(
    (state) => state.tasks.createLoading
  );


  const createError = useSelector(
    (state) => state.tasks.createError
  );


  const updateLoading = useSelector(
    (state) => state.tasks.updateLoading
  );


  const updateError = useSelector(
    (state) => state.tasks.updateError
  );


  const deleteLoading = useSelector(
    (state) => state.tasks.deleteLoading
  );


  const deleteError = useSelector(
    (state) => state.tasks.deleteError
  );


  const dispatch = useDispatch();


  // =====================================================
  // GET TASKS
  // =====================================================

  useEffect(() => {

    dispatch(fetchTasks());

  }, [dispatch]);

  useEffect(() => {
    console.log("Debounced search:", debouncedSearch);
    }, [debouncedSearch]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const tasksPerPage = 2;


  // =====================================================
  // EDIT CLICK
  // =====================================================

  const handleEdit = useCallback((task) => {

    setEditingTask(task);

    setShowForm(true);

  }, []);


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = useCallback(
    async (id) => {

      try {

        await dispatch(
          deleteTask(id)
        ).unwrap();

      } catch (error) {

        console.error(
          "Delete task failed:",
          error
        );
      }

    },
    [dispatch]
  );


  // =====================================================
  // SEARCH FOCUS
  // =====================================================

  function focusSearch() {

    searchRef.current?.focus();
  }


  // =====================================================
  // FILTER + SORT
  // =====================================================

  const sortedTasks = useMemo(() => {

    const filtered = tasks

      .filter((task) =>
        task.title
          .toLowerCase()
          .includes(search.toLowerCase())
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


    return [...filtered].sort((a, b) => {

      if (sortBy === "TITLE") {

        return a.title.localeCompare(
          b.title
        );
      }


      if (sortBy === "PRIORITY") {

        const priorityOrder = {
          HIGH: 1,
          MEDIUM: 2,
          LOW: 3
        };


        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );
      }


      return 0;

    });

  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
    sortBy
  ]);


  // =====================================================
  // PAGINATED TASKS
  // =====================================================

  const totalPages = Math.ceil(
    sortedTasks.length / tasksPerPage
  );


  const startIndex =
    (currentPage - 1) *
    tasksPerPage;


  const paginatedTasks =
    sortedTasks.slice(
      startIndex,
      startIndex + tasksPerPage
    );


  // =====================================================
  // OPEN CREATE FORM
  // =====================================================

  function handleCreateTask() {

    setEditingTask(null);

    setShowForm(true);
  }


  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  async function handleSaveTask(formData) {

    try {

      // ==========================================
      // UPDATE
      // ==========================================

      if (editingTask) {

        await dispatch(
          updateTask({
            id: editingTask.id,
            taskData: formData
          })
        ).unwrap();

      }

      // ==========================================
      // CREATE
      // ==========================================

      else {

        await dispatch(
          createTask(formData)
        ).unwrap();

      }


      // ==========================================
      // ONLY AFTER SUCCESS
      // ==========================================

      setShowForm(false);

      setEditingTask(null);

    } catch (error) {

      console.error(
        "Save task failed:",
        error
      );
    }
  }


  // =====================================================
  // FORM LOADING
  // =====================================================

  const formLoading =
    editingTask
      ? updateLoading
      : createLoading;


  return (

    <div>

      <h1>Tasks</h1>


      {/* ==========================================
          CREATE BUTTON
          ========================================== */}

      <button
        className="create-task-button"
        onClick={handleCreateTask}
      >
        + Create Task
      </button>


      {/* ==========================================
          FORM
          ========================================== */}

      {showForm && (

        <TaskForm
          editingTask={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {

            setShowForm(false);

            setEditingTask(null);
          }}
          loading={formLoading}
        />

      )}


      {/* ==========================================
          CREATE ERROR
          ========================================== */}

      {createError && !editingTask && (

        <p>
          {createError}
        </p>
      )}


      {/* ==========================================
          UPDATE ERROR
          ========================================== */}

      {updateError && editingTask && (

        <p>
          {updateError}
        </p>
      )}


      {/* ==========================================
          DELETE ERROR
          ========================================== */}

      {deleteError && (

        <p>
          {deleteError}
        </p>
      )}


      {/* ==========================================
          THEME
          ========================================== */}

      <button
        onClick={() =>
          setTheme(
            theme === "light"
              ? "dark"
              : "light"
          )
        }
      >
        Change Theme
      </button>


      {/* ==========================================
          CONTROLS
          ========================================== */}

      <div className="task-controls">

        <input
          ref={searchRef}
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <button onClick={focusSearch}>
          Focus Search
        </button>


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="ALL">
            All Statuses
          </option>

          <option value="TODO">
            Todo
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="COMPLETED">
            Completed
          </option>

        </select>


        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
        >

          <option value="ALL">
            All Priorities
          </option>

          <option value="HIGH">
            High
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="LOW">
            Low
          </option>

        </select>


        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="NONE">
            Sort By
          </option>

          <option value="TITLE">
            Title
          </option>

          <option value="PRIORITY">
            Priority
          </option>

        </select>

      </div>


      {/* ==========================================
          TASK LIST
          ========================================== */}

      {loading ? (

        <p>
          Loading tasks...
        </p>

      ) : paginatedTasks.length === 0 ? (

        <p>
          No tasks found.
        </p>

      ) : (

        <div className="task-list">

          {paginatedTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
              deleteLoading={deleteLoading}
            />

          ))}

        </div>
      )}


      {/* ==========================================
          PAGINATION
          ========================================== */}

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }
        >
          Previous
        </button>


        <span>
          Page {currentPage} of {totalPages}
        </span>


        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Tasks;