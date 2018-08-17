const path = require('path')
const production = process.env.NODE_ENV === 'production'
const WebpackDefinePlugin = require('webpack').DefinePlugin

require('dotenv').config({
  path: path.resolve(process.cwd(), production ? '.env' : '.env.development')
})

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
      API_CLIENT_KEY: JSON.stringify(process.env.API_CLIENT_KEY),
      SITE_URL: JSON.stringify(process.env.SITE_URL),
      API_URL: JSON.stringify(process.env.API_URL),
      DEV_BASIC_AUTH: JSON.stringify(!production ? process.env.DEV_BASIC_AUTH : null),
      SEGMENT_WRITE_KEY: JSON.stringify(process.env.SEGMENT_WRITE_KEY)
    })
  )
}
