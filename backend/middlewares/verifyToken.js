import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.header("Authorization")?.split(" ")[1]; // Assuming token is sent in the format: 'Bearer token'
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token to req.user
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};
