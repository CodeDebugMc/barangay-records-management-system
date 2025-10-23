// src/components/CertificationFinancialAssistance.jsx
import React, { useEffect, useState } from 'react';
import LogoNgCaloocan from '../assets/Caloocan_City.png';
import Logo145 from '../assets/brgy_145.png';
import axios from 'axios';
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
} from '@mui/material';

const baseURL = 'http://localhost:3000';

const CertificationFinancialAssistance = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    birthday: '',
    address: '',
    income: '',
    purpose: '',
    dateIssued: '',
  });

  // If you want to prefill from localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem('certificateData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.warn('Saved certificateData invalid', e);
      }
    }
  }, []);

  // Controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save to backend and optionally localStorage
  const handleSave = async () => {
    // basic client-side validation
    if (!formData.name.trim() || !formData.address.trim()) {
      setSnackbarMessage('Please provide at least Name and Address.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      // send to backend
      await axios.post(`${baseURL}/certificates`, {
        name: formData.name,
        age: formData.age || null,
        birthdate: formData.birthday || null,
        address: formData.address,
        income: formData.income || null,
        purpose: formData.purpose || null,
        date_issued: formData.dateIssued || null,
      });

      // optionally persist locally so user doesn't lose draft
      localStorage.setItem('certificateData', JSON.stringify(formData));

      setSnackbarMessage('Certificate saved successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error saving certificate:', err);
      setSnackbarMessage(
        err.response?.data?.error || 'Failed to save certificate.'
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

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
              label="Birthday (e.g. 1980-12-26)"
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
              {loading ? 'Saving...' : 'Save Certificate'}
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => {
                // clear form (optional)
                setFormData({
                  name: '',
                  age: '',
                  birthday: '',
                  address: '',
                  income: '',
                  purpose: '',
                  dateIssued: '',
                });
                localStorage.removeItem('certificateData');
                setSnackbarMessage('Form cleared');
                setSnackbarSeverity('info');
                setSnackbarOpen(true);
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* certificate preview */}
      <Box sx={{ mb: 6 }}>
        <div style={styles.page}>
          <img
            src={LogoNgCaloocan}
            alt="City Logo"
            style={{
              width: '120px',
              position: 'absolute',
              top: '30px',
              left: '60px',
            }}
          />
          <img
            src={Logo145}
            alt="Barangay Logo"
            style={{
              width: '120px',
              position: 'absolute',
              top: '30px',
              right: '60px',
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
                This is to certify that, <b>{formData.name || '_________'}</b>,{' '}
                <b>{formData.age || '__________'}</b> yrs. old, born on{' '}
                <b>{formData.birthday || '__________'}</b> a bonafide resident
                at Barangay 145 with actual postal address located at{' '}
                <b>{formData.address || '__________'}</b>, Bagong Barrio,
                Caloocan City. <br />
                <br />
              </div>

              <div style={styles.textIndent}>
                This further certifies that the above-mentioned name has a LOW
                SOURCE OF INCOME (<b>{formData.purpose || '__________'}</b>),
                with monthly income not exceeding &#8369;
                <b> {formData.income || '__________'}</b>. <br /> <br />
              </div>

              <div style={styles.textIndent}>
                This certification is being issued for Financial Assistance.{' '}
                <br /> <br />
              </div>
              <div style={styles.textIndent}>
                Issued this <b>{formData.dateIssued || '__________'}</b> at
                Barangay 145, Zone 13, District 1, Caloocan City.
              </div>
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '80px',
              width: '100%',
              fontStyle: 'italic',
            }}
          >
            <div>
              <div style={{ textAlign: 'left' }}>
                <br />
                <p
                  style={{
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    margin: 0,
                    fontStyle: 'normal',
                  }}
                >
                  Rosalina P. Anore
                </p>
                <br />
                <p
                  style={{
                    display: 'inline-block',
                    margin: '0px 12px',
                    fontSize: 12,
                  }}
                >
                  Barangay Secretary
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <br />
              <p
                style={{
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  margin: 0,
                  fontStyle: 'normal',
                }}
              >
                arnold l. dondonayos
              </p>
              <br />
              <p
                style={{
                  display: 'inline-block',
                  margin: '0px 12px',
                  fontSize: 12,
                }}
              >
                Punong Barangay - Brgy.145
              </p>
            </div>
          </div>
        </div>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const styles = {
  page: {
    width: '210mm', // A4 width
    minHeight: '297mm', // A4 height
    margin: '0 auto',
    padding: '40px',
    border: '1px solid #000',
    position: 'relative',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    fontWeight: 'bold', // all text bold by default
  },
  watermarkImg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.1,
    width: '75%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  republic: {
    textAlign: 'center',
    fontFamily: "'Quintessential', cursive",
    fontSize: '18px',
  },
  city: {
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
  },
  barangay: {
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
    fontWeight: 600, // not bold
  },
  office: {
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '18px',
    marginBottom: '32px',
    fontWeight: 'bold',
  },
  certification: {
    textAlign: 'center',
    fontFamily: "'Times new roman', sans-serif",
    fontSize: '56px',
    textTransform: 'uppercase',
    letterSpacing: '6px',
    color: '#444',
    marginBottom: '48px',
  },
  toWhomItMayConcern: {
    textTransform: 'uppercase',
    fontSize: '18px',
    fontFamily: "'Calibri', sans-serif",
    marginBottom: '32px',
  },
  textIndent: {
    textIndent: '50px',
  },
  paragraph: {
    fontSize: '16px',
  },
};

export default CertificationFinancialAssistance;
