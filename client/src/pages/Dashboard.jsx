import { Container, Typography, Box, Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../api/api";
import ReusableTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import { useTeam } from "../context/TeamContext";
import {useAuth} from "../context/AuthContext";

const Dashboard = () => {
  const [memberships, setMemberships] = useState([]);
  const navigate = useNavigate();
  const { setTeam } = useTeam();
  const {user} = useAuth();

  const fetchMemberships = async () => {
    try {
      const res = await API.get("/membership/my-memberships");
      setMemberships(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const columns = [
    {
      field: "team",
      headerName: "Team",
    },
    {
      field: "role",
      headerName: "Role",
      render: (row) => (
        <Chip label={row.role?.name} color="primary" size="small" />
      ),
    },
    {
      field: "permissions",
      headerName: "Permissions",
      render: (row) => (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {row.role?.permissions?.map((p) => (
            <Chip key={p._id} label={p.name} size="small" />
          ))}
        </Stack>
      ),
    },
  ];

  const data = memberships.map((m) => ({
    _id: m._id,
    team: m.team?.name,
    role: m.role,
    permissions: m.role?.permissions,
    full: m, 
  }));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Memberships - {user?.name}
      </Typography>

      {memberships.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6">
            You are not part of any team
          </Typography>
          <Typography variant="body2">
            Contact admin to get access
          </Typography>
        </Box>
      ) : (
        <Box
          onClick={(e) => {
            const rowId = e.target.closest("tr")?.getAttribute("data-id");
          }}
        >
          <ReusableTable
            columns={columns}
            data={data}
          />
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;