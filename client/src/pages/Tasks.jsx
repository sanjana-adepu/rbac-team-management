import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useTeam } from "../context/TeamContext";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table";

const Tasks = () => {
  const { team } = useTeam();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const [title, setTitle] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const canCreate = permissions.includes("CREATE_TASK");
  const canEdit = permissions.includes("EDIT_TASK");
  const canDelete = permissions.includes("DELETE_TASK");
  
  useEffect(() => {
    if (!team) {
      navigate("/teams");
    }
  }, [team]);

  const fetchPermissions = async () => {
    if (!team || !user?._id) return;

    try {
      const res = await API.get(
        `/membership/permissions?userId=${user._id}&teamId=${team._id}`
      );
      setPermissions(res.data.map((p) => p.name));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    if (!team?._id) return;

    try {
      const res = await API.get(`/tasks?teamId=${team._id}`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    if (!team) return;
    fetchPermissions();
    fetchTasks();
  }, [team]);

  const createTask = async () => {
    if (!title.trim()) return toast.error("Task title required");

    try {
      await API.post("/tasks", { title, teamId: team._id });
      setTitle("");
      toast.success("Task created");
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Create failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Deleted");
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const openEdit = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditOpen(true);
  };

  const updateTask = async () => {
    try {
      await API.put(`/tasks/${editTask._id}`, {
        title: editTitle,
      });

      toast.success("Updated");
      setEditOpen(false);
      fetchTasks();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Task",
    },
    {
      field: "actions",
      headerName: "Actions",
      render: (task) => (
        <>
          {canEdit && (
            <IconButton onClick={() => openEdit(task)}>
              <EditIcon />
            </IconButton>
          )}

          {canDelete && (
            <IconButton
              color="error"
              onClick={() => deleteTask(task._id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{margin:"5px"}}>
      <Box p={3}>
    <div style={{marginBottom:"10px"}}>
      <Typography variant="h5" mb={2}>
        Tasks - {team?.name}
      </Typography>
      </div>
      <div style={{marginBottom:"10px"}}>
      {canCreate && (
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="New Task"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button variant="contained" onClick={createTask}>
            Add
          </Button>
        </Stack>
      )}
      </div>

      <Table columns={columns} data={tasks} />

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateTask}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
  );
};

export default Tasks;