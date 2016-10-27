import { applyMiddleware, createStore } from 'redux'
import thunk  from 'redux-thunk'
import reducers from './reducers'

function configureStore(state) {
	const store = createStore(
		reducers,
		state,
		applyMiddleware(thunk)
	)
	return store
}

const store = configureStore()

export default store
