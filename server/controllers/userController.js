const service = require("../services/userService");

function login(req, res, next) {
  const { params, query, body } = req;
  service
    .login(body.email, body.password)
    .then(({ user, authToken }) => res.json({ success: true, user, authToken }))
    .catch(next);
}

function register(req, res, next) {
  const { params, query, body } = req;
  service
    .register(body.email, body.password, body.name)
    .then(({ user, authToken }) => res.json({ success: true, user, authToken }))
    .catch(next);
}

function logout(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .logout(body.authToken)
    .then(() => res.json({ success: true }))
    .catch(next);
}

function deleteAccount(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .deleteAccount(body.authToken, userId, body.password)
    .then(() => res.json({ success: true }))
    .catch(next);
}

module.exports = {
  login,
  register,
  logout,
  deleteAccount,
};
