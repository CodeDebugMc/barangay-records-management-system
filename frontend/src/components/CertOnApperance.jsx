import LogoNgCaloocan from "../assets/Caloocan_City.png";
import Logo145 from "../assets/brgy_145.png";

const CertOnApperance = () => {
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
      <div style={styles.office}>OFFICE OF THE LUPONG TAGAPAMAYAPA</div>
      <hr />
      <div style={{ textAlign: "right" }}>
        <p
          style={{
            display: "inline-block",
            margin: "0",
            fontSize: "14px",
            fontWeight: "normal",
          }}
        >
          Barangay Case No. 2025-0901
        </p>
        <p style={{ margin: "0px 0px 8px" }}>Case: Unjust Vexation</p>
      </div>
      <div style={styles.toWhomItMayConcern}>
        dolores badurai y reusi / nelia begaso y langub
      </div>
      <p style={{ margin: "0px 0px 8px", fontWeight: "normal" }}>
        Complainants
      </p>
      <p style={{ margin: "0px 0px 8px" }}>-against-</p>
      <div style={styles.toWhomItMayConcern}>linda chuaquico</div>
      <p style={{ margin: "0px 0px 8px", fontWeight: "normal" }}>Respondent</p>
      <div style={styles.certification}>notice of apperance</div>
      <div style={styles.paragraph}>
        <p>
          <div style={styles.textIndent}>
            You are hereby invited to appear before the LUPON on the 5th day of
            September, 2025, at 6:00 in the evening for a hearing of the
            above-entitled case. Please be advised, 30 30-minute late consider
            the postponement of the hearing.
          </div>
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
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
            margin: "0px 0px 32px",
            fontSize: 12,
          }}
        >
          Punong Barangay - Brgy.145
        </p>
      </div>
      <p>Notified this 4th day of Sept. 2025</p>
      {/* Bottom Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "32px",
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
                fontSize: "16px",
                fontWeight: "normal",
              }}
            >
              Complainant:
            </p>
            <br />
            <p
              style={{
                display: "inline-block",
                margin: "0px 0px",
                fontStyle: "normal",
                fontSize: "16px",
              }}
            >
              DOLORES BADURIA Y REUSI/ NELIA BEGASO Y LANGUB
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
              fontSize: "16px",
              fontWeight: "normal",
            }}
          >
            Respondent:
          </p>
          <br />
          <p
            style={{
              display: "inline-block",
              margin: "0px 0px",
              fontStyle: "normal",
              fontSize: "16px",
            }}
          >
            LINDA CHUAQUICO
          </p>
        </div>
      </div>

      {/* Time */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "42px",
          width: "100%",
          fontStyle: "italic",
        }}
      >
        {/* Prepared By */}
        <div>
          <div style={{ textAlign: "left", fontStyle: "normal" }}>
            <div>Served by: ______________________</div>
            <div>Time: ______________________</div>
            <div>Received by: ______________________</div>
            <div>Remarks: ______________________</div>
          </div>
        </div>

        {/* Signature */}
        <div
          style={{
            textAlign: "right",
            textTransform: "uppercase",
            fontStyle: "normal",
          }}
        >
          <div>
            <div>lupon members:</div>
            <div>LORALIE COLUMBA</div>
            <div>melinda tecson</div>
            <div>jewela resco</div>
          </div>
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
    fontSize: "28px",
    textTransform: "uppercase",
    letterSpacing: "4px",
    color: "#00c700",
    marginBottom: "48px",
  },
  toWhomItMayConcern: {
    textTransform: "uppercase",
    fontSize: "18px",
    fontFamily: "'Calibri', sans-serif",
  },

  textIndent: {
    textIndent: "50px",
  },
  paragraph: {
    fontSize: "16px",
    marginBottom: "80px",
  },
};

export default CertOnApperance;
