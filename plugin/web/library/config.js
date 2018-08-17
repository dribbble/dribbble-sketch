const platformIdentifier = 'sketch'

// const siteUrl = "https://dribbble.com/oauth"
// const apiUrl = "https://api.dribbble.com/v2/"
const siteUrl = "http://localhost:3000"
const apiUrl = "http://api.localhost:3000/v2"

// Dribbble requires a shot to
// be at least 400x300 pixels
const dimensionReqs = {
  width: 400,
  height: 300
}

module.exports = {
  platformIdentifier,
  siteUrl,
  apiUrl,
  dimensionReqs
}
