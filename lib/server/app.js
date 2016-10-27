import Http from 'http'
import Debug from 'debug'
import Express from 'express'
import Body from 'body-parser'
import ExpressHandlebars from 'express-handlebars'

import Config from './config'
import Routes from './routes'

const debug = Debug('app')

export default class App {

    static app = null
    static server = null

    static createExpressServer() {
        const app = this.app = Express()
        const server = Http.createServer(app)
        app.use(Express.static('public'))
        app.use(Body.json())
        app.engine('handlebars', ExpressHandlebars({ defaultLayout: 'main' }))
        app.set('view engine', 'handlebars')
        Routes.setup(app)
        return server
    }

    static async startHttpServer() {
        await this.server.listen(Config.httpPort)
        debug('server connected on port ' + Config.httpPort)
    }

    static async start() {
        var error = null
        try {
            this.server = this.createExpressServer()
            debug('created server', !!this.server)
            await this.startHttpServer()
        } catch (e) {
            error = e
            debug(error)
        }
    }

}

