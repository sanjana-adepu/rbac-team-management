import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await login(form);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

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
          Login
        </Button>

        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/register")}>
          Register instead
        </Button>
      </Box>
    </Container>
  );
};

export default Login;