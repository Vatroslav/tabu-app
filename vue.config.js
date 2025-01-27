module.exports = {
  devServer: {
    allowedHosts: "all",
    server: {
      type: 'https',
      options: {
        key: process.env.VUE_APP_PRIVATE_KEY,
        cert: process.env.VUE_APP_CERTIFICATE,
        ca: process.env.VUE_APP_CA_BUNDLE,
        requestCert: true,
        rejectUnauthorized: false
      }
    },
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    proxy: {
      '/ws': {
        target: `wss://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`,
        changeOrigin: true,
        ws: true
      }
    }
  }
}
