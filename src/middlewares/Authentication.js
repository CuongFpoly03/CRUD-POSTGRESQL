const jtw = require("jsonwebtoken");

// Middleware xác thực token từ cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ err: "k cho phep" });
  }
  jtw.verify(token, process.env.accssTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ err: "caam" });
    req.user = user;
    next();
  });
}
// Middleware xác thực refreshToken từ cookie
function authenticateRefreshToken(req, res, next) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "k cho phep" });

  jwt.verify(token, process.env.accssTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "cam" });
    req.user = user;
    next();
  });
}
// Tạo accessToken với thời gian sống là 50 giây
function createAccessToken(user) {
  return jwt.sign(user, process.env.accssTokenSecret, { expiresIn: "50s" });
}

// Tạo refreshToken với thời gian sống là 365 ngày
function createRefreshToken(user) {
  return jwt.sign(user, process.env.accssTokenSecret, { expiresIn: "365d" });
}

module.exports = {
  authenticateToken,
  authenticateRefreshToken,
  createAccessToken,
  createRefreshToken,
};
console.log(`Secret Key: ${SECRET_KEY}`);
console.log(`Access Token Secret: ${ACCESS_TOKEN_SECRET}`);
console.log(`Refresh Token Secret: ${REFRESH_TOKEN_SECRET}`);
