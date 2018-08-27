const config = require('./config')

/**
 * Generate a random string
 */
const randomString = function() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

/**
 * Pick a random element from an array
 */
const pickRandom = function(array) {
  return array[Math.floor(Math.random() * array.length)]
}

module.exports = {
  config,
  randomString,
  pickRandom,
}
