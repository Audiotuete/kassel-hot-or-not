var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // USER_PASSWORD: '"_`kn<4gBDtYxp(e."',
  USER_PASSWORD: '"mXc}b@[:yZ3WhF2"',
  ROOT_API: '"https://leidenschaftlich-fuehren.de/graphql"',
  TOKEN_KEY: '"YXnk}cg8N{KUSx?"',
  POLL_ID: '2'
})
