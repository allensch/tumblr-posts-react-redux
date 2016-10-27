import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Route, Router, IndexRoute } from 'react-router'

import store from './store'

import App from './containers/App.jsx'
import Main from './containers/pages/Main.jsx'
import Favorites from './containers/pages/Favorites.jsx'

export default class Routes {

    static setup(elementId) {
        render((
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Main} />
                        <Route path="favorites" component={Favorites} />
                    </Route>
                </Router>
            </Provider>
        ), document.getElementById(elementId))
    }

}
