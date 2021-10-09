module.exports = (req, res, next) => {
  const { userId } = req.cookies;
  
  if (!userId) {
    throw new Error('You need to be signed in order to continue!');
  }
  req.userId = userId;
  
  next();
};
