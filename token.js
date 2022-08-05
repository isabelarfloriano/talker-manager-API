// Based on Bonus Activity - 22.4 - Course - Trybe
const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = generateToken;