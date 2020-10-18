const { getConnection } = require("../dbConnection");
const {
  hashPassword,
  checkHashedPassword,
  generateAuthToken,
} = require("../util");

/**
 * Validates an auth token. Returns corresponding user ID if valid.
 * @param {string} token auth token to validate
 * @throws throws error if token is invalid
 * @returns {number} user ID
 */
async function validateAuthToken(token) {
  console.log("Validate auth token", token);
  const result = await getConnection().query(
    "select * from authToken where token = ?",
    [token]
  );
  if (!result.length) throw new Error("Invalid auth token");
  const userId = result[0].userId;
  console.log("  Valid for user", userId);
  return result[0].userId;
}

async function councilMemberCheck(userId) {
  console.log("Councilmember check", userId);
  const [
    user,
  ] = await getConnection().query("select role from user where userId = ?", [
    userId,
  ]);
  console.log(user.role);
  if (user.role !== "councilmember") {
    throw new Error("You must be a councilmember to perform this action.");
  }
  return true;
}

async function createAuthToken(userId) {
  const token = generateAuthToken();

  const result = await getConnection().query(
    "insert into authToken (token, userId) values (?, ?)",
    [token, userId]
  );
  if (!result.affectedRows) throw new Error("Failed to create auth token");

  return token;
}

async function login(email, password) {
  console.log("Login", email, password);

  const result = await getConnection().query(
    "select password from user where email = ?",
    [email]
  );
  if (!result.length) throw new Error("Invalid email or password");
  const [{ password: hashedPassword }] = result;

  if (!(await checkHashedPassword(password, hashedPassword))) {
    throw new Error("Invalid email or password");
  }

  const [
    user,
  ] = await getConnection().query(
    "select userId, role, name, email from user where email = ?",
    [email]
  );

  const authToken = await createAuthToken(user.userId);
  console.log("  Login successful");

  return {
    authToken,
    user,
  };
}

async function register(email, password, name) {
  console.log("Register", email, password, name);

  if (password.length < 8) throw new Error("Password must be ≥ 8 characters");
  const hashedPassword = await hashPassword(password);

  const result = await getConnection().query(
    "insert into user (name, email, password, role) values (?, ?, ?, 'user')",
    [name, email, hashedPassword]
  );
  const newUserId = result.insertId;

  const [
    user,
  ] = await getConnection().query(
    "select userId, role, name, email from user where email = ?",
    [email]
  );

  const authToken = await createAuthToken(newUserId);

  return {
    authToken,
    user,
  };
}

async function logout(authToken) {
  console.log("Logout", authToken);
  await getConnection().query("delete from authToken where token = ?", [
    authToken,
  ]);
}

async function deleteAccount(authToken, userId, password) {
  console.log("Delete account", authToken, userId, password);
  await getConnection().query("delete from user where userId = ?", [userId]);
}

module.exports = {
  validateAuthToken,
  councilMemberCheck,
  login,
  register,
  logout,
  deleteAccount,
};
