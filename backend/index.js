// Clean commits
import express from "express";
import cors from "cors";
import leaveRoutes from "./routes/leaveRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import settingsRoutes from "./routes/settingRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/leave", leaveRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/company-settings", settingsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
