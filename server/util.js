const bcrypt = require("bcryptjs");
const {  v4: uuidv4 } = require("uuid");

/**
 * Generates a password hash to store in the database.
 * Used for signup, password reset, and updating profile.
 * @param {string} password password to hash
 * @returns {string} password hash
 */
async function hashPassword(password) {
  const saltLength = 10;
  return bcrypt.hash(password, saltLength);
}

/**
 * Check if a user-provided password matches a hashed password
 * Used for login and updating profile.
 * @param {string} plaintextPassword user-provided password
 * @param {string} hashedPassword password hash from database to check again
 */
async function checkHashedPassword(plaintextPassword, hashedPassword) {
  return bcrypt.compare(plaintextPassword, hashedPassword);
}

/**
 * Generate a random auth token.
 * @returns {string} auth token
 */
function generateAuthToken() {
  return uuidv4();
}

module.exports = {
  hashPassword,
  checkHashedPassword,
  generateAuthToken,
};
