module.exports = {
  platformIdentifier: 'sketch',
  browserIdentifier: 'dribbble-sketch',

  apiKey: API_CLIENT_KEY,
  siteUrl: `https://${DOMAIN_NAME}`,
  apiUrl: `https://api-${DOMAIN_NAME}/v2`,
  helpUrl: `https://help.dribbble.com/`,

  segmentWriteKey: SEGMENT_WRITE_KEY,

  dimensionReqs: {
    min: {
      width: 400,
      height: 300
    },
    max: {
      width: 1600,
      height: 1200
    }
  }
}
