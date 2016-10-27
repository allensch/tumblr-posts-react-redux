import SearchHandler from './handlers/search_handler'
import WebappHandler from './handlers/webapp_handler'

export default class Routes {

    static setup(app) {
        app.post('/api/search', SearchHandler.search)
        app.get('*', WebappHandler.main)
    }

}
