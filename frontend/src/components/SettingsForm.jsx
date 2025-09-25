import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const SettingsForm = ({ onUpdate, onPreview }) => {
  const [companyName, setCompanyName] = useState("");
  const [headerColor, setHeaderColor] = useState("#ffffff");
  const [footerText, setFooterText] = useState("");
  const [footerColor, setFooterColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null); // new logo preview
  const [currentLogo, setCurrentLogo] = useState(null); // DB logo
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Load current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:3000/company-settings");
        const data = await res.json();

        if (data) {
          setCompanyName(data.company_name || "");
          setHeaderColor(data.header_color || "#ffffff");
          setFooterText(data.footer_text || "");
          setFooterColor(data.footer_color || "#ffffff");
          if (data.logo_url) {
            setCurrentLogo(`http://localhost:3000${data.logo_url}`);
          }

          // Initialize preview
          if (onPreview) {
            onPreview({
              company_name: data.company_name,
              header_color: data.header_color,
              footer_text: data.footer_text,
              footer_color: data.footer_color,
              logo_url: data.logo_url
                ? `http://localhost:3000${data.logo_url}`
                : null,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, [onPreview]);

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      if (onPreview) {
        onPreview({
          company_name: companyName,
          header_color: headerColor,
          footer_text: footerText,
          footer_color: footerColor,
          logo_url: previewURL,
        });
      }
    }
  };

  // Handle live color/text preview
  useEffect(() => {
    if (onPreview) {
      onPreview({
        company_name: companyName,
        header_color: headerColor,
        footer_text: footerText,
        footer_color: footerColor,
        logo_url: preview || currentLogo,
      });
    }
  }, [companyName, headerColor, footerText, footerColor, preview, currentLogo]);

  // Save to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("header_color", headerColor);
    formData.append("footer_text", footerText);
    formData.append("footer_color", footerColor);
    if (logo) formData.append("logo", logo);

    try {
      await axios.post("http://localhost:3000/company-settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbarMessage("Company settings updated successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error saving settings:", error);
      setSnackbarMessage("Failed to update settings. Try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Typography variant="h5" gutterBottom>
          Company Settings
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="color"
                label="Header Color"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="color"
                label="Footer Color"
                value={footerColor}
                onChange={(e) => setFooterColor(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Footer Text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="logo-upload">
                <Input
                  accept="image/*"
                  id="logo-upload"
                  type="file"
                  onChange={handleLogoChange}
                />
                <Button variant="contained" component="span">
                  Upload New Logo
                </Button>
              </label>

              {/* Current Logo */}
              {currentLogo && !preview && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Current Logo:</Typography>
                  <img
                    src={currentLogo}
                    alt="Current Logo"
                    style={{ maxWidth: "150px", marginTop: "8px" }}
                  />
                </Box>
              )}

              {/* Preview */}
              {preview && (
                <Box mt={2}>
                  <Typography variant="subtitle2">New Logo Preview:</Typography>
                  <img
                    src={preview}
                    alt="Logo Preview"
                    style={{ maxWidth: "150px", marginTop: "8px" }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Settings
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsForm;
