import { connect } from 'react-redux'

export default class ReduxUtils {

	static connect(klass) {
		var component
		const state = klass.mapStateToProps
		const dispatch = klass.mapDispatchToProps
		if (typeof state === 'function' && typeof dispatch === 'function') {
			component = connect(state, dispatch)(klass)
		} else if (typeof state === 'function') {
			component = connect(state)(klass)
		} else {
			throw new Error('ReduxUtils.connect requires `mapStateToProps` defined')
		}
		return component
	}

}
