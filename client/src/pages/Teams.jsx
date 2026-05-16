import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/TeamContext";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const { setTeam } = useTeam();

  useEffect(() => {
    API.get("/teams/my-teams").then((res) => setTeams(res.data));
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {teams.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team._id}>
          <Card
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
            onClick={() => {
              setTeam(team);
              navigate("/tasks");
            }}
          >
            <CardContent>
              <Typography variant="h6">{team.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Teams;