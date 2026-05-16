import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await register(form);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5">Register</Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Register
        </Button>

        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/login")}>
          Login instead
        </Button>
      </Box>
    </Container>
  );
};

export default Register;