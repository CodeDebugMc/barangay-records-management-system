import React, { useEffect, useState } from "react";
import LogoNgCaloocan from "../assets/Caloocan_City.png";
import Logo145 from "../assets/brgy_145.png";
import axios from "axios";
import {
  Alert,
  Container,
  Snackbar,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  Card,
  CardContent,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BASE_URL } from "./apiConfig";

const CertificationFinancialAssistance = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null); // null = create mode

  const [formData, setFormData] = useState({
    resident_id: null,
    name: "",
    age: "",
    birthday: "",
    address: "",
    income: "",
    purpose: "",
    dateIssued: "",
    transaction_number: "",
  });

  // load records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/financial-assistance`);
      setRecords(res.data || []);
    } catch (err) {
      console.error("fetchRecords:", err);
      setSnackbar("Failed to load records", "error");
    }
  };

  const setSnackbar = (msg, severity = "success") => {
    setSnackbarMessage(msg);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Save (create) or Update
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      setSnackbar("Please provide at least Name and Address.", "warning");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        // UPDATE
        const payload = {
          resident_id: formData.resident_id || null,
          name: formData.name,
          age: formData.age || null,
          birthdate: formData.birthday || null,
          address: formData.address,
          income: formData.income || null,
          purpose: formData.purpose || null,
          date_issued: formData.dateIssued || null,
          transaction_number: formData.transaction_number || null,
        };
        const res = await axios.put(
          `${BASE_URL}/financial-assistance/${editingId}`,
          payload
        );
        setSnackbar("Record updated", "success");
        // replace in local list
        setRecords((list) =>
          list.map((r) => (r.id === editingId ? res.data : r))
        );
        setEditingId(null);
        setFormData({
          resident_id: null,
          name: "",
          age: "",
          birthday: "",
          address: "",
          income: "",
          purpose: "",
          dateIssued: "",
          transaction_number: "",
        });
      } else {
        // CREATE
        const payload = {
          resident_id: formData.resident_id || null,
          name: formData.name,
          age: formData.age || null,
          birthdate: formData.birthday || null,
          address: formData.address,
          income: formData.income || null,
          purpose: formData.purpose || null,
          date_issued: formData.dateIssued || null,
        };
        const res = await axios.post(
          `${BASE_URL}/financial-assistance`,
          payload
        );
        setSnackbar("Record saved", "success");
        setRecords((r) => [res.data, ...r]);
        setFormData({
          resident_id: null,
          name: "",
          age: "",
          birthday: "",
          address: "",
          income: "",
          purpose: "",
          dateIssued: "",
          transaction_number: "",
        });
      }
    } catch (err) {
      console.error("save:", err);
      setSnackbar(err.response?.data?.error || "Failed to save", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData({
      resident_id: record.resident_id || null,
      name: record.name || "",
      age: record.age || "",
      birthday: record.birthdate ? record.birthdate.split("T")[0] : "",
      address: record.address || "",
      income: record.income || "",
      purpose: record.purpose || "",
      dateIssued: record.date_issued ? record.date_issued.split("T")[0] : "",
      transaction_number: record.transaction_number || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleView = (record) => {
    // populate preview (same as edit but not set editingId)
    setEditingId(null);
    setFormData({
      resident_id: record.resident_id || null,
      name: record.name || "",
      age: record.age || "",
      birthday: record.birthdate ? record.birthdate.split("T")[0] : "",
      address: record.address || "",
      income: record.income || "",
      purpose: record.purpose || "",
      dateIssued: record.date_issued ? record.date_issued.split("T")[0] : "",
      transaction_number: record.transaction_number || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${BASE_URL}/financial-assistance/${id}`);
      setRecords((list) => list.filter((r) => r.id !== id));
      setSnackbar("Record deleted", "info");
    } catch (err) {
      console.error("delete:", err);
      setSnackbar("Failed to delete", "error");
    }
  };

  const handleClear = () => {
    setEditingId(null);
    setFormData({
      resident_id: null,
      name: "",
      age: "",
      birthday: "",
      address: "",
      income: "",
      purpose: "",
      dateIssued: "",
      transaction_number: "",
    });
    setSnackbar("Form cleared", "info");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Certification Form
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="standard"
              required
            />
          </Grid>

          <Grid item xs={6} sm={2}>
            <TextField
              name="age"
              label="Age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              variant="standard"
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              name="birthday"
              label="Birthday (YYYY-MM-DD)"
              value={formData.birthday}
              onChange={handleChange}
              fullWidth
              variant="standard"
              placeholder="YYYY-MM-DD"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              variant="standard"
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              name="purpose"
              label="Purpose / Occupation"
              value={formData.purpose}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              name="income"
              label="Monthly Income (PHP)"
              value={formData.income}
              onChange={handleChange}
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <TextField
              name="dateIssued"
              label="Date Issued (YYYY-MM-DD)"
              value={formData.dateIssued}
              onChange={handleChange}
              fullWidth
              variant="standard"
              placeholder="YYYY-MM-DD"
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update"
                : "Save Certificate"}
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* certificate preview (kept your layout) */}
      <Box sx={{ mb: 6 }}>
        <div style={styles.page}>
          <img
            src={LogoNgCaloocan}
            alt="City Logo"
            style={{
              width: "120px",
              position: "absolute",
              top: "30px",
              left: "60px",
            }}
          />
          <img
            src={Logo145}
            alt="Barangay Logo"
            style={{
              width: "120px",
              position: "absolute",
              top: "30px",
              right: "60px",
            }}
          />
          <img src={Logo145} alt="Watermark" style={styles.watermarkImg} />

          <div style={styles.republic}>Republic of the Philippines</div>
          <div style={styles.city}>CITY OF CALOOCAN</div>
          <div style={styles.barangay}>
            BARANGAY 145 ZONES 13 DIST. 1 <br />
            Tel. No. 8711-7134
          </div>

          <div style={styles.office}>OFFICE OF THE BARANGAY CHAIRMAN</div>
          <hr />
          <div style={styles.certification}>certification</div>

          <div style={styles.toWhomItMayConcern}>to whom it may concern:</div>

          <div style={styles.paragraph}>
            <p>
              <div style={styles.textIndent}>
                This is to certify that, <b>{formData.name || "_________"}</b>,{" "}
                <b>{formData.age || "__________"}</b> yrs. old, born on{" "}
                <b>{formData.birthday || "__________"}</b> a bonafide resident
                at Barangay 145 with actual postal address located at{" "}
                <b>{formData.address || "__________"}</b>, Bagong Barrio,
                Caloocan City. <br />
                <br />
              </div>

              <div style={styles.textIndent}>
                This further certifies that the above-mentioned name has a LOW
                SOURCE OF INCOME (<b>{formData.purpose || "__________"}</b>),
                with monthly income not exceeding &#8369;
                <b> {formData.income || "__________"}</b>. <br /> <br />
              </div>

              <div style={styles.textIndent}>
                This certification is being issued for Financial Assistance.{" "}
                <br /> <br />
              </div>
              <div style={styles.textIndent}>
                Issued this <b>{formData.dateIssued || "__________"}</b> at
                Barangay 145, Zone 13, District 1, Caloocan City.
              </div>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "80px",
              width: "100%",
              fontStyle: "italic",
            }}
          >
            <div>
              <div style={{ textAlign: "left" }}>
                <br />
                <p
                  style={{
                    textTransform: "uppercase",
                    display: "inline-block",
                    margin: 0,
                    fontStyle: "normal",
                  }}
                >
                  Rosalina P. Anore
                </p>
                <br />
                <p
                  style={{
                    display: "inline-block",
                    margin: "0px 12px",
                    fontSize: 12,
                  }}
                >
                  Barangay Secretary
                </p>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <br />
              <p
                style={{
                  textTransform: "uppercase",
                  display: "inline-block",
                  margin: 0,
                  fontStyle: "normal",
                }}
              >
                arnold l. dondonayos
              </p>
              <br />
              <p
                style={{
                  display: "inline-block",
                  margin: "0px 12px",
                  fontSize: 12,
                }}
              >
                Punong Barangay - Brgy.145
              </p>
            </div>
          </div>
        </div>
      </Box>

      {/* Records list with actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Saved Certificates</Typography>
          <Divider sx={{ my: 1 }} />
          {records.length === 0 ? (
            <Typography color="text.secondary">No records yet.</Typography>
          ) : (
            <List>
              {records.map((r) => (
                <ListItem
                  key={r.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        edge="end"
                        aria-label="view"
                        onClick={() => handleView(r)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(r)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(r.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={r.name}
                    secondary={`Transaction: ${
                      r.transaction_number || "—"
                    } • Issued: ${
                      r.date_issued ? r.date_issued.split("T")[0] : "—"
                    }`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const styles = {
  page: {
    width: "210mm",
    minHeight: "297mm",
    margin: "0 auto",
    padding: "40px",
    border: "1px solid #000",
    position: "relative",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    fontWeight: "bold",
  },
  watermarkImg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.1,
    width: "75%",
    pointerEvents: "none",
    zIndex: 0,
  },
  republic: {
    textAlign: "center",
    fontFamily: "'Quintessential', cursive",
    fontSize: "18px",
  },
  city: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "16px",
  },
  barangay: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
  },
  office: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "18px",
    marginBottom: "32px",
    fontWeight: "bold",
  },
  certification: {
    textAlign: "center",
    fontFamily: "'Times new roman', sans-serif",
    fontSize: "56px",
    textTransform: "uppercase",
    letterSpacing: "6px",
    color: "#444",
    marginBottom: "48px",
  },
  toWhomItMayConcern: {
    textTransform: "uppercase",
    fontSize: "18px",
    fontFamily: "'Calibri', sans-serif",
    marginBottom: "32px",
  },
  textIndent: {
    textIndent: "50px",
  },
  paragraph: {
    fontSize: "16px",
  },
};

export default CertificationFinancialAssistance;
