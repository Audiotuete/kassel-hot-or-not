var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USER_PASSWORD: '"_`kn<4gBDtYxp(e."',
  ROOT_API: '"http://localhost:8000/graphql"',
  TOKEN_KEY: '"YXnk}cg8N{KUSx?"'
})
