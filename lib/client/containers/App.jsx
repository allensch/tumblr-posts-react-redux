import React, { Component, PropTypes } from 'react'

import Header from './Header.jsx'
import Redux from '../utils/redux'

class App extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    static mapStateToProps(state) {
        return { }
    }

    render() {
        const { children, dispatch } = this.props
        return (
            <main>
                <Header dispatch={dispatch} />
                <section>
                    {children}
                </section>
            </main>
        )
    }

}

export default Redux.connect(App)
