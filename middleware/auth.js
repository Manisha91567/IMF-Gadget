const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (req, res) => {
    const payload = {
      username: 'admin',
      password: 'password123'
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token });
};

// Middleware to verify the token for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = user; // Attach user data to the request object
    next();
  });
};

module.exports = { generateToken, authenticateToken };
