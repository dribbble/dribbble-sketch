require('dotenv').config()
const WebpackDefinePlugin = require('webpack').DefinePlugin
const production = process.env.NODE_ENV === 'production'

module.exports = config => {
  config.resolve.extensions = ['.js', '.jsx']

  if (process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map'
  }

  config.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    exclude: /node_modules/,
    loader: 'file-loader'
  })

  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  })

  config.plugins.push(
    new WebpackDefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      API_CLIENT_KEY: JSON.stringify(!production
        ? process.env.API_CLIENT_KEY
        : '62deac8a106c866b6047c864a24cdab7f0d03b6330e0099bfeda45eac6a1b8b5'
      ),
      SITE_URL: JSON.stringify(!production
        ? process.env.SITE_URL
        : 'https://dribbble.com'
      ),
      API_URL: JSON.stringify(!production
        ? process.env.API_URL
        : 'https://api.dribbble.com/v2'
      ),
      STAGING_AUTH: JSON.stringify(!production
        ? process.env.STAGING_AUTH
        : null
      ),
      SEGMENT_WRITE_KEY: JSON.stringify(!production
        ? process.env.SEGMENT_WRITE_KEY
        : 'XUEHVaNvscWlxX96OkUVoTqj4kc7F2yr'
      )
    })
  )
}
