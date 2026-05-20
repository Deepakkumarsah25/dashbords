const authMiddleware = (req, res, next) => {
  // अभी सभी को allow कर रहे हैं
  console.log("Auth middleware hit");
  next();
};

export default authMiddleware;