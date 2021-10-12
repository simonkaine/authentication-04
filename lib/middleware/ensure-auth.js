const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    req.user = jwt.verify(sessionId, process.env.SECRET_KEY);

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
