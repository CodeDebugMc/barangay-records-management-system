import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const CompanySettingsForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [headerColor, setHeaderColor] = useState("#ffffff");
  const [footerText, setFooterText] = useState("");
  const [footerColor, setFooterColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load existing settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/company-settings"); // <-- adjust API path
        const data = await res.json();

        if (data) {
          setCompanyName(data.company_name || "");
          setHeaderColor(data.header_color || "#ffffff");
          setFooterText(data.footer_text || "");
          setFooterColor(data.footer_color || "#ffffff");
          if (data.logo_url) {
            setPreview(data.logo_url);
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Handle image preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("header_color", headerColor);
    formData.append("footer_text", footerText);
    formData.append("footer_color", footerColor);
    if (logo) {
      formData.append("logo", logo);
    }

    try {
      const res = await fetch("/company-settings", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert("Failed to save settings.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error occurred while saving.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
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
                  Upload Logo
                </Button>
              </label>
              {preview && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Preview:</Typography>
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

export default CompanySettingsForm;
