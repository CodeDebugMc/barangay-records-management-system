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
<<<<<<< HEAD
  Divider,
=======
  Button,
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
<<<<<<< HEAD
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PeopleIcon from "@mui/icons-material/People";

const Overview = () => {
=======

const Dashboard = () => {
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
  const [totalRequests, setTotalRequests] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
=======
    // Fetch total requests count
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
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

<<<<<<< HEAD
  // Config for summary cards
  const summaryCards = [
    {
      title: "Financial Assistance",
      icon: <MonetizationOnIcon />,
      count: totalRequests,
      color: "#1976d2",
    },
    {
      title: "Cohabitation",
      icon: <FamilyRestroomIcon />,
      count: totalRequests,
      color: "#0288d1",
    },
    {
      title: "Cash Assistance",
      icon: <MonetizationOnIcon />,
      count: totalRequests,
      color: "#2e7d32",
    },
    {
      title: "Proof of Residency",
      icon: <HomeIcon />,
      count: totalRequests,
      color: "#7b1fa2",
    },
    {
      title: "Barangay Clearance",
      icon: <GavelIcon />,
      count: totalRequests,
      color: "#d32f2f",
    },
    {
      title: "Indigency",
      icon: <PeopleIcon />,
      count: totalRequests,
      color: "#f57c00",
    },
  ];

  // Config for quick links
  const quickLinks = [
    {
      title: "Financial Assistance",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Cohabitation",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Cash Assistance",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Proof of Residency",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Barangay Clearance",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Indigency",
      desc: "Submit a new request form",
      icon: <AssignmentIcon sx={{ fontSize: 50, color: "primary.main" }} />,
      path: "/request-form",
    },
    {
      title: "Request History",
      desc: "View past requests",
      icon: <HistoryIcon sx={{ fontSize: 50, color: "secondary.main" }} />,
      path: "/request-history",
    },
    {
      title: "Settings",
      desc: "Manage your account",
      icon: <SettingsIcon sx={{ fontSize: 50, color: "success.main" }} />,
      path: "/settings",
    },
  ];

=======
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

<<<<<<< HEAD
        {/* Summary Section */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: card.color,
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>{card.icon}</Box>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h3" fontWeight="bold">
                  {card.count}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Quick Links Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          | Request Form
        </Typography>
        <Grid container spacing={3}>
          {quickLinks.map((link, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-5px)" },
                }}
                onClick={() => navigate(link.path)}
              >
                <CardContent>
                  {link.icon}
                  <Typography variant="h6" mt={1}>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {link.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
=======
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
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
        </Grid>
      </Box>
    </Container>
  );
};

<<<<<<< HEAD
export default Overview;
=======
export default Dashboard;
>>>>>>> 031b758782757aef4f5dc8383b09280f11d030d0
