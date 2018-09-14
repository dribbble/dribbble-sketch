module.exports = {
  platformIdentifier: 'sketch',
  browserIdentifier: 'dribbble-sketch',

  apiKey: API_CLIENT_KEY,
  siteUrl: `https://${DOMAIN_NAME}`,
  apiUrl: `https://api-${DOMAIN_NAME}/v2`,
  helpUrl: `https://help.dribbble.com/`,

  dimensionReqs: {
    small: {
      width: 400,
      height: 300
    },
    large: {
      width: 800,
      height: 600
    }
  }
}
