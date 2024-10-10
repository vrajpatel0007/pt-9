const jwt = require('jsonwebtoken');
const JWT_SECRET = "vj"
const authUser = async (req, res, next) => {
  try {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.cookies.token;
    console.log("🚀 ~ authUser ~ token:", token)

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("🚀 ~ authUser ~ req.user:", req.user)

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  console.log("🚀 ~ authorizeAdmin ~ req.user.Rol:", req.user)
  console.log("🚀 ~ authorizeAdmin ~ req.user && req.user.Rol === 'Admin':", req.user && req.user.Rol === 'Admin')
  if (req.user && req.user.Rol === 'Admin' || req.user && req.user.Rol === 'Teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized. Admin access required' });
  }
};

module.exports = {
  authUser,
  authorizeAdmin
};
