import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        setSnackbarMessage("Username and password are required");
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
        return;
      }

      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
      });

      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => navigate("/"), 1500); // Redirect after success
    } catch (error) {
      console.error("Error registering user", error);
      setSnackbarMessage(error.response?.data?.error || "Registration failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Paper
        elevation={6}
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo or Title */}
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Create an Account
        </Typography>

        {/* Form */}
        <Box sx={{ width: "100%", mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#0f81f0" }}
            onClick={handleRegister}
          >
            Register
          </Button>

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
