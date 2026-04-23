const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ecomira-ultra-secret-key';

module.exports = function(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const bearer = token.split(' ')[1] || token;
    const decoded = jwt.verify(bearer, JWT_SECRET);
    req.user = decoded; // { id, email, ... }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};
