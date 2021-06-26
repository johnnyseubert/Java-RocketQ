const express = require('express')
const server = express()
const route = require('./route')
// Path pega o caminho da pasta maior do projeto no cado PROJETONLW
const path = require('path')

// Obrigatório setar qual a engine que vai renderizar as extenções do arquivo
server.set('view engine', 'ejs')

// Permitindo o node utilizar a pasta public aonde fica as imagens styles e scripts do projeto
server.use(express.static("public"))

// Linha linkando aonde está a pasta views   path = caminho do PROJETONLW/__dirname/views    PROJETONLW/SRC/VIEWS
server.set('views', path.join(__dirname, 'views'))

// Necessário decodificar a url para poder receber password etc pela url
server.use(express.urlencoded({extended: true}))

server.use(route)
server.listen(3000, () => console.log('Servidor rodando   localhost:3000'))