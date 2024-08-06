import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  
  if (!token) {
    return res.status(401).send({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Invalid or expired access token" });
  }
};

export default authenticateToken