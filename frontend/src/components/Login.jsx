import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../assets/bagong-pilipinas-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Username and password are required");
        return;
      }

      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      setError(""); // Clear error on success
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
      setError(error.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: "100%" }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <img
              src={logo} // <-- Replace with your logo file path
              alt="Company Logo"
              style={{ height: "80px", objectFit: "contain" }}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#0f81f0",
              "&:hover": { bgcolor: "#0c68c7" },
              borderRadius: 2,
              fontWeight: "bold",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Register Link */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#0f81f0",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
