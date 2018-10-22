'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '" https://easy-mock.com/mock/5bc6d2b3fdbedf688e700e9e/web"',//gaoyibing111@126.com
})
