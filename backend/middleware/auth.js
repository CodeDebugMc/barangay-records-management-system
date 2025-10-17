import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // token via header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // e.g. { id, username, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// role middleware factory
export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  // allow superadmin to bypass role checks
  if (req.user.role === role || req.user.role === "superadmin") return next();
  return res.status(403).json({ error: "Forbidden" });
};
