const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const PORT = 3000

server.get('/echo', (req, res) => {
    res.jsonp('q')
})

server.use(middlewares)
server.use(router)

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${3000}`)
})