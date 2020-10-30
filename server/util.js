const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

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

// Taken from https://html.spec.whatwg.org/#e-mail-state-(type=email)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Check if an email address is in a valid format.
 * @param {string} email address to check
 * @returns {boolean} valid
 */
function isEmailValid(email) {
  return emailRegex.test(email.toLowerCase());
}

module.exports = {
  hashPassword,
  checkHashedPassword,
  generateAuthToken,
  isEmailValid,
};
