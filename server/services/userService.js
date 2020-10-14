/**
 * Validates an auth token. Returns corresponding user ID if valid.
 * @param {string} token auth token to validate
 * @throws throws error if token is invalid
 * @returns {number} user ID
 */
async function validateAuthToken(token) {
  // TODO
  console.log("Validate auth token", token);
  return 123;
}

async function councilMemberCheck(userId) {
  console.log("Councilmember check", userId);
  // TODO throw if not actually a councilmember
  return true;
}

async function login(email, password) {
  console.log("Login", email, password);
  const authToken = "asdf";
  const user = {
    userId: 12,
    role: "user",
    name: "john",
    email: "john@example.com",
  };
  return {
    authToken,
    user,
  };
}

async function register(email, password, name) {
  console.log("Register", email, password, name);
  const authToken = "asdf";
  const user = {
    userId: 12,
    role: "user",
    name: "john",
    email: "john@example.com",
  };
  return {
    authToken,
    user,
  };
}

async function logout(authToken) {
  console.log("Logout", authToken);
  // TODO delete auth token
  return true;
}

async function deleteAccount(authToken, userId, password) {
  console.log("Delete account", authToken, userId, password);
  // TODO delete user
  return true;
}

module.exports = {
  validateAuthToken,
  councilMemberCheck,
  login,
  register,
  logout,
  deleteAccount,
};
