import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const storedUser = localStorage.getItem("username") || "";
    const storedRole = localStorage.getItem("role") || "";

    setUser(storedUser);
    setRole(storedRole);

    // Role-based access
    if (storedRole !== "superadmin" && storedRole !== "admin") {
      navigate("/user");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome {user}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Role: {role}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default Dashboard;
