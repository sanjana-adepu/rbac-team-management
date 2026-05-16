import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTeam } from "../context/TeamContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { team } = useTeam();

  const handleTasksClick = () => {
    if (!team) {
      navigate("/teams");
    } else {
      navigate("/tasks");
    }
  };


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Team Manager</Typography>

        {user && (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Memberships
            </Button>

            <Button color="inherit" onClick={() => navigate("/teams")}>
              Teams
            </Button>

            <Button color="inherit" onClick={handleTasksClick}>
              Tasks
            </Button>

            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;