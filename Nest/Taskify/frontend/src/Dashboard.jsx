import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react"; // for cross icon (optional)
import { createTask, getAllTasks, markTaskCompleted, deleteTask } from "./api/task.service";
import { profile } from "./api/user.service";
import Navbar from "./Components/Navbar";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const location = useLocation();


  // 📦 Fetch all tasks on mount
  const navigate = useNavigate();

  // Redirect to login if no token and fetch tasks when present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // If login passed tasks through router state, use them to avoid extra fetch
    if (location?.state?.tasks) {
      setTasks(location.state.tasks);
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await profile();
      setUser(res?.user || res || null);
    } catch (err) {
      console.error('Failed to fetch profile', err);
    }
  }

  // ➕ Create Task
  const handleAddTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill both Title and Description!");
      return;
    }

    try {
      setLoading(true);
      const res = await createTask({ title, description });
      setTasks([...tasks, res]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark Task as Completed
  const handleMarkCompleted = async (id) => {
    try {
      setLoadingIds(prev => new Set(prev).add(id));
      const res = await markTaskCompleted(id);
      const updated = tasks.map((task) => (task._id === id ? res : task));
      setTasks(updated);
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error('Failed to update task');
    }
  };

  // ❌ Delete Task
  const handleDeleteTask = async (id) => {
    try {
      // confirmation
      if (!window.confirm('Delete this task?')) return;
      setLoadingIds(prev => new Set(prev).add(id));
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error('Failed to delete task');
    }
  };

  // 👀 View Task Details
  const handleViewTask = (task) => {
    alert(`📝 ${task.title}\n\n${task.description}`);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
    } catch (e) {}
    navigate('/login');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 rounded-2xl">
      <div className="w-full min-h-screen px-4 md:px-8 py-5">
        {/* Navbar */}
        <Navbar user={user} onLogout={handleLogout} />

        <div className="flex flex-col md:flex-row items-start justify-start w-full mt-5 gap-5">
          {/* Left Section - Create Task */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl p-4 md:p-5 shadow-lg border border-gray-300 flex flex-col gap-4 text-black">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter Task Title..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={handleAddTask}
                disabled={loading}
                className="h-10 w-10 flex items-center justify-center text-white bg-black text-2xl rounded-full active:scale-95 transition-all duration-200"
                title="Add Task"
              >
                {loading ? "…" : "+"}
              </button>
            </div>

            <textarea
              placeholder="Enter task description..."
              rows="5"
              className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button
              onClick={handleAddTask}
              disabled={loading}
              className="mt-auto bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>

          {/* Right Section - Task List */}
          <div className="w-full md:w-2/3 lg:w-3/4 min-h-[300px] p-2 md:p-4 flex flex-wrap gap-5">
            {(!tasks || tasks.length === 0) ? (
              <p className="text-gray-500 text-lg mt-4">No tasks created yet.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="relative w-full sm:w-[250px] h-auto sm:h-[220px] bg-white text-black rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between border border-gray-300"
                >
                  {/* ❌ Delete Button */}
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    title="Delete Task"
                  >
                    <X size={18} />
                  </button>

                  <div>
                    <h1 className="text-xl font-semibold text-blue-600 truncate">
                      {task.title}
                    </h1>
                    <h2 className="text-sm text-gray-700 mt-2 line-clamp-4">
                      {task.description}
                    </h2>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <h3
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </h3>

                    {task.status === "Pending" ? (
                      <button
                        onClick={() => handleMarkCompleted(task._id)}
                        className="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white transition-all"
                      >
                        Mark Done
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewTask(task)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white transition-all"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
