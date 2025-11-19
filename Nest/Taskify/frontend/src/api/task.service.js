import axios from "../api/axios";
import toast from "react-hot-toast";

// ✅ Get all tasks
export const getAllTasks = async () => {
  try {
  const res = await axios.get("/task/getall");
  // backend wraps responses as { success, timestamp, data }
  // return the inner data so callers receive the actual payload (array of tasks)
  return res.data?.data;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};

// ✅ Create a new task
export const createTask = async (taskData) => {
  try {
  const res = await axios.post("/task/create", taskData);
  const payload = res.data?.data;
  toast.success("Task created");
  return payload;
  } catch (err) {
    console.error("Error creating task:", err);
    toast.error(err?.response?.data?.message || "Failed to create task");
    throw err;
  }
};

// ✅ Delete a task by ID
export const deleteTask = async (id) => {
  try {
  const res = await axios.delete(`/task/${id}`);
  const payload = res.data?.data;
  toast.success("Task deleted");
  return payload;
  } catch (err) {
    console.error("Error deleting task:", err);
    toast.error(err?.response?.data?.message || "Failed to delete task");
    throw err;
  }
};

// ✅ Mark task as completed (optional)
export const markTaskCompleted = async (id) => {
  try {
  const res = await axios.patch(`/task/${id}`, { status: "Completed" });
  const payload = res.data?.data;
  toast.success("Task updated");
  return payload;
  } catch (err) {
    console.error("Error updating task status:", err);
    toast.error(err?.response?.data?.message || "Failed to update task");
    throw err;
  }
};
