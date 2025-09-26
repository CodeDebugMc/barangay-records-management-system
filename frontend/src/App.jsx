import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

// Import components
import Leave from "./components/Leave";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/Dashboard1";
import CertificationAction from "./components/CertificationAction";
import CertificationFinancialAssistance from "./components/CertFinancialAssistance";
import SettingsForm from "./components/SettingsForm";
import CertOnApperance from "./components/CertOnApperance";
import Overview from "./components/overview";

function App() {
  const [settings, setSettings] = useState({});

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/company-settings"
      );
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Stable callback for live preview
  const handlePreview = useCallback((liveData) => {
    setSettings(liveData);
  }, []);

  return (
    <Container>
      <Router>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: "0px 130px",
          }}
        >
          {/* Header */}
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: settings.header_color || "primary.main",
            }}
          >
            <Toolbar>
              {settings.logo_url && (
                <img
                  src={`http://localhost:3000${settings.logo_url}`}
                  alt="Logo"
                  style={{ height: "56px", margin: "0px 10px 0px 130px" }}
                />
              )}
              <Typography variant="h6" noWrap>
                {settings.company_name || "My Company"}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<Dashboard1 />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/cert2" element={<CertOnApperance />} />
              <Route path="/overview" element={<Overview />} />
              <Route
                path="/cert1"
                element={<CertificationFinancialAssistance />}
              />
              <Route
                path="/settings"
                element={
                  <SettingsForm
                    onUpdate={fetchSettings}
                    onPreview={handlePreview}
                  />
                }
              />
            </Routes>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
              left: 0,
              zIndex: (theme) => theme.zIndex.drawer + 1,
              bgcolor: settings.footer_color || "#ffffff",
              color: "black",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Typography variant="body1">
              {settings.footer_text || "Default Footer Text"}
            </Typography>
          </Box>
        </Box>
      </Router>
    </Container>
  );
}

export default App;
