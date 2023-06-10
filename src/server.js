// Import Module
const hapi = require('@hapi/hapi')
const {routes} = require('./routes.js')

const initServer = async () => {
    const server = hapi.server({
        port:9000,
        host:'localhost',
        routes:{
            cors:{
                origin:['*']
            }
        }
    })

    server.route(routes)
    await server.start()
}

initServer()