import JWT from "jsonwebtoken";

// 🔐 PROTECT ROUTES (require login)
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    // ✅ Extract token (remove "Bearer ")
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // ✅ Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // attach user data
    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

// 🛡️ ADMIN ACCESS ONLY
export const isAdmin = (req, res, next) => {
  try {
    // ✅ Check role directly from token
    if (Number(req.user.role) !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in Admin Middleware",
      error,
    });
  }
};