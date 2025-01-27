const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  devServer: {
    allowedHosts: "all",
    https: {
      key: fs.readFileSync(process.env.VUE_APP_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.VUE_APP_CERTIFICATE),
      ca: fs.readFileSync(process.env.VUE_APP_CA_BUNDLE),
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_ADDRESS,
        changeOrigin: true,
        secure: false,
        headers: {
          Connection: 'keep-alive'
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  }
}
