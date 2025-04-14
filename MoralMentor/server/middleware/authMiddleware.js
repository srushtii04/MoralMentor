const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  // If there is no token, send an error response
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token and extract user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user id to the request object for use in subsequent routes
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is invalid or expired, send an error response
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
