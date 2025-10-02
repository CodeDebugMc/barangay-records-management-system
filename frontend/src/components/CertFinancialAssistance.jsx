import LogoNgCaloocan from "../assets/Caloocan_City.png";
import Logo145 from "../assets/brgy_145.png";

const CertificationFinancialAssistance = () => {
  return (
    <div style={styles.page}>
      {/* Logos */}
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

      {/* Watermark */}
      <img src={Logo145} alt="Watermark" style={styles.watermarkImg} />

      {/* Header */}
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
            This is to certify that, NAME, AGE yrs. old, born on Dec. 26, 1966
            BIRTHDAY a bonafide resident at Barangay 145 with actual postal
            address located at 216 Magaling St., Barangay 145, Bagong Barrio,
            Caloocan City. <br />
            <br />
          </div>
          <div style={styles.textIndent}>
            This further certifies that the above-mentioned name has a LOW
            SOURCE OF INCOME (Electrician) PURPOSE , with monthly income not
            exceeding 3,000 INCOME. <br /> <br />
          </div>

          <div style={styles.textIndent}>
            This certification is being issued for Financial Assistance. <br />{" "}
            <br />
          </div>
          <div style={styles.textIndent}>
            Issued this 17th day of Sept., 2025 DATE at Barangay 145, Zone 13,
            District 1, Caloocan City.
          </div>
        </p>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "80px",
          width: "100%",
          fontStyle: "italic",
        }}
      >
        {/* Prepared By */}
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

        {/* Signature */}
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
    </div> // closes the main page div
  );
};

const styles = {
  page: {
    width: "210mm", // A4 width
    minHeight: "297mm", // A4 height
    margin: "0 auto",
    padding: "40px",
    border: "1px solid #000",
    position: "relative",
    backgroundColor: "#fff",
    boxSizing: "border-box",
    fontWeight: "bold", // all text bold by default
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
    fontWeight: 600, // not bold
  },
  office: {
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "18px",
    marginBottom: "32px",
    fontWeight: "bold",
  },

  lupon: {
    textAlign: "center",
    fontFamily: "Calibri, sans-serif",
    fontStyle: "italic",
    fontSize: "16px",
    marginBottom: "2px",
    fontWeight: "bold",
  },
  date: {
    textAlign: "right",
    fontFamily: "Calibri, sans-serif",
    fontSize: "14px",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  caseInfo: {
    textAlign: "right",
    fontFamily: "Calibri, sans-serif",
    fontSize: "14px",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  title: {
    textAlign: "center",
    fontFamily: "Calibri, sans-serif",
    fontSize: "17px",

    margin: "30px 0",
    fontStyle: "italic",
  },
  content: {
    margin: "20px 0",
    fontFamily: "Calibri, sans-serif",
    fontSize: "14px",
    position: "relative",
    zIndex: 1,
    fontStyle: "italic",
  },
  preparedBy: {
    marginTop: "60px",
    fontFamily: "Calibri, sans-serif",
    fontSize: "14px",
    width: "15%", // Optional: restrict width for proper alignment
    display: "inline-block",
    fontStyle: "italic",
  },

  signature: {
    marginTop: "40px",
    fontFamily: "Calibri, sans-serif",
    fontSize: "14px",
    fontStyle: "italic",
  },

  // Changes here
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
