const jwt = require('jsonwebtoken');
const NotAuthorizationError = require('../errors/notAuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthorizationError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new NotAuthorizationError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
