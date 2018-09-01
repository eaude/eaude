module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/start.js'
    return config
  }
}
