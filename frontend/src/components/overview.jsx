import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

const Dashboard = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total requests count
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/requests/count"
        );
        setTotalRequests(response.data.total || 0);
      } catch (error) {
        console.error("Error fetching requests count", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

        {/* Summary Card */}
        <Card
          sx={{
            mb: 4,
            p: 3,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6">Total Requests</Typography>
          <Typography variant="h3" color="primary" fontWeight="bold">
            {totalRequests}
          </Typography>
        </Card>

        {/* Quick Links */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
              }}
              onClick={() => navigate("/request-form")}
            >
              <CardContent>
                <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />
                <Typography variant="h6" mt={1}>
                  New Request
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Submit a new request form
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
              }}
              onClick={() => navigate("/request-history")}
            >
              <CardContent>
                <HistoryIcon sx={{ fontSize: 50, color: "secondary.main" }} />
                <Typography variant="h6" mt={1}>
                  Request History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View past requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
              }}
              onClick={() => navigate("/settings")}
            >
              <CardContent>
                <SettingsIcon sx={{ fontSize: 50, color: "success.main" }} />
                <Typography variant="h6" mt={1}>
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your account
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
