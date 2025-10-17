import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

const API_BASE = "http://localhost:3000"; // change if needed

/* ---------------- Certificate template component ---------------- */
const CertificatePreview = ({ data }) => {
  if (!data) return null;

  // Logo URLs (ensure files are in public/ so they are accessible by path)
  const cityLogo = "/Caloocan_City.png";
  const brgyLogo = "/brgy_145.png";

  const { name, age, birthdate, address, purpose, income, date_issued } = data;

  // fallback values for display
  const issuedDate = date_issued || new Date().toLocaleDateString();

  return (
    <div
      id="certificate-root"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: 40,
        margin: "0 auto",
        border: "1px solid #000",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        fontFamily: "Calibri, sans-serif",
      }}
    >
      {/* Logos */}
      <img
        src={cityLogo}
        alt="City Logo"
        style={{ width: 120, position: "absolute", top: 30, left: 60 }}
      />
      <img
        src={brgyLogo}
        alt="Barangay Logo"
        style={{ width: 120, position: "absolute", top: 30, right: 60 }}
      />

      {/* Watermark */}
      <img
        src={brgyLogo}
        alt="Watermark"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.07,
          width: "75%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          fontSize: 18,
          marginTop: 10,
          fontWeight: 700,
        }}
      >
        Republic of the Philippines
      </div>
      <div style={{ textAlign: "center", fontSize: 16 }}>CITY OF CALOOCAN</div>
      <div style={{ textAlign: "center", fontSize: 14, fontWeight: 600 }}>
        BARANGAY 145 ZONES 13 DIST. 1 <br />
        Tel. No. 8711-7134
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 18,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        OFFICE OF THE BARANGAY CHAIRMAN
      </div>
      <hr />

      <div
        style={{
          textAlign: "center",
          fontSize: 36,
          textTransform: "uppercase",
          margin: "20px 0",
        }}
      >
        Certification
      </div>

      <div
        style={{ textTransform: "uppercase", fontSize: 16, marginBottom: 12 }}
      >
        To whom it may concern:
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.8 }}>
        <p style={{ textIndent: 50 }}>
          This is to certify that{" "}
          <strong style={{ textTransform: "uppercase" }}>
            {name || "NAME"}
          </strong>
          , {age ? `${age} yrs. old` : "AGE yrs. old"}, born on{" "}
          {birthdate || "BIRTHDAY"}, a bonafide resident at Barangay 145 with
          actual postal address located at{" "}
          <strong>{address || "ADDRESS"}</strong>.
        </p>

        <p style={{ textIndent: 50 }}>
          This further certifies that the above-mentioned person has a{" "}
          <strong>low source of income</strong> ({purpose || "Occupation"}),
          with monthly income not exceeding <strong>{income || "₱0"}</strong>.
        </p>

        <p style={{ textIndent: 50 }}>
          This certification is being issued for{" "}
          <strong>{purpose || "Financial Assistance"}</strong>.
        </p>

        <p style={{ textIndent: 50 }}>
          Issued this <strong>{issuedDate}</strong> at Barangay 145, Zone 13,
          District 1, Caloocan City.
        </p>
      </div>

      {/* Signatures */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 80,
          fontStyle: "italic",
        }}
      >
        <div>
          <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Rosalina P. Anore
          </div>
          <div style={{ fontSize: 12 }}>Barangay Secretary</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Arnold L. Dondonayos
          </div>
          <div style={{ fontSize: 12 }}>Punong Barangay - Brgy.145</div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Main RequestsAdmin component ---------------- */
const RequestsAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // create form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [income, setIncome] = useState("");
  const [dateIssued, setDateIssued] = useState("");

  // edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // view dialog (preview)
  const [viewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  // delete confirm
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // snackbar
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const showSnack = (msg, severity = "success") => {
    setSnackMsg(msg);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/requests`);
      setRequests(res.data || []);
    } catch (err) {
      console.error("Fetch requests error", err);
      showSnack("Failed to load requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // CREATE
  const handleCreate = async () => {
    if (!name.trim() || !address.trim()) {
      showSnack("Name and address are required", "warning");
      return;
    }
    try {
      const payload = {
        name: name.trim(),
        age: age || null,
        birthdate: birthdate || null,
        address: address.trim(),
        purpose: purpose.trim(),
        income: income || null,
        date_issued: dateIssued || new Date().toLocaleDateString(),
      };
      await axios.post(`${API_BASE}/requests`, payload);
      showSnack("Request created", "success");
      // reset
      setName("");
      setAge("");
      setBirthdate("");
      setAddress("");
      setPurpose("");
      setIncome("");
      setDateIssued("");
      fetchRequests();
    } catch (err) {
      console.error("Create error", err);
      showSnack("Failed to create request", "error");
    }
  };

  // EDIT
  const openEdit = (r) => {
    setEditId(r.id);
    setEditData(r);
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editData.name?.trim() || !editData.address?.trim()) {
      showSnack("Name and address are required", "warning");
      return;
    }
    try {
      await axios.put(`${API_BASE}/requests/${editId}`, {
        name: editData.name,
        age: editData.age,
        birthdate: editData.birthdate,
        address: editData.address,
        purpose: editData.purpose,
        income: editData.income,
        date_issued: editData.date_issued,
      });
      showSnack("Request updated", "success");
      setEditOpen(false);
      fetchRequests();
    } catch (err) {
      console.error("Update error", err);
      showSnack("Failed to update request", "error");
    }
  };

  // DELETE
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/requests/${deleteId}`);
      showSnack("Request deleted", "success");
      setDeleteOpen(false);
      setDeleteId(null);
      fetchRequests();
    } catch (err) {
      console.error("Delete error", err);
      showSnack("Failed to delete request", "error");
    }
  };

  // VIEW (open certificate preview)
  const handleView = (r) => {
    setViewData(r);
    setViewOpen(true);
  };

  // PRINT - opens a new window with certificate HTML and triggers print
  const printCertificate = (data) => {
    if (!data) return;
    // You can tweak styles, fonts, and logo srcs here as needed
    const html = `
      <html>
        <head>
          <title>Certificate</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Calibri, sans-serif; padding: 20px; color: #000; }
            .container { width: 210mm; margin: 0 auto; }
            h1 { text-transform: uppercase; font-size: 36px; text-align:center; }
            p { line-height: 1.6; font-size: 16px; }
            .sign { display:flex; justify-content:space-between; margin-top:80px; }
          </style>
        </head>
        <body>
          <div class="container">
            ${document.getElementById("certificate-root")?.outerHTML || ""}
          </div>
        </body>
      </html>
    `;
    const w = window.open("", "_blank", "width=900,height=700");
    w.document.open();
    w.document.write(html);
    w.document.close();
    // give it a moment to render images
    setTimeout(() => w.print(), 500);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Requests - Certificate (CRUD)
      </Typography>

      {/* Create Form */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Create new request
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            size="small"
            sx={{ width: 120 }}
          />
          <TextField
            label="Birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            size="small"
            sx={{ width: 160 }}
            placeholder="YYYY-MM-DD"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            size="small"
            fullWidth
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <TextField
            label="Purpose / Occupation"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Monthly Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            size="small"
            sx={{ width: 160 }}
          />
          <TextField
            label="Issued Date"
            value={dateIssued}
            onChange={(e) => setDateIssued(e.target.value)}
            size="small"
            sx={{ width: 160 }}
            placeholder="YYYY-MM-DD"
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreate}
            >
              Create
            </Button>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={() => {
                setName("");
                setAge("");
                setBirthdate("");
                setAddress("");
                setPurpose("");
                setIncome("");
                setDateIssued("");
              }}
            >
              Clear
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="6%">ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Address</TableCell>
                <TableCell width="12%">Issued</TableCell>
                <TableCell width="18%">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {!loading && requests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No requests found.
                  </TableCell>
                </TableRow>
              )}

              {requests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.purpose}</TableCell>
                  <TableCell>{r.address}</TableCell>
                  <TableCell>{r.date_issued}</TableCell>
                  <TableCell>
                    <IconButton
                      title="View"
                      color="primary"
                      onClick={() => handleView(r)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      title="Edit"
                      color="primary"
                      onClick={() => openEdit(r)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      title="Delete"
                      color="error"
                      onClick={() => confirmDelete(r.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Request</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Full Name"
              value={editData.name || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Age"
              value={editData.age || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, age: e.target.value }))
              }
            />
            <TextField
              label="Birthdate"
              value={editData.birthdate || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, birthdate: e.target.value }))
              }
            />
            <TextField
              label="Address"
              value={editData.address || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, address: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Purpose"
              value={editData.purpose || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, purpose: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Income"
              value={editData.income || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, income: e.target.value }))
              }
            />
            <TextField
              label="Issued Date"
              value={editData.date_issued || ""}
              onChange={(e) =>
                setEditData((p) => ({ ...p, date_issued: e.target.value }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleEditSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View / Preview Dialog */}
      <Dialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Certificate Preview</DialogTitle>
        <DialogContent dividers>
          {/* Use the CertificatePreview component */}
          <CertificatePreview data={viewData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => printCertificate(viewData)}
          >
            Print Certificate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this request?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestsAdmin;
