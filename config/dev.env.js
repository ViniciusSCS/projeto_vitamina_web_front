'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGIN_ERRO: '"Nome de usuário ou senha incorretos. Por favor tente novamente!"',
  PRODUTO_CADASTRADO_SUCESSO: '"Produto cadastrado com sucesso!"',
  PRODUTO_ATUALIZADO_SUCESSO: '"Produto atualizado com sucesso!"',
  PRODUTO_CADASTRADO_ERRO: '"Erro ao cadastrar produto!"',
})
