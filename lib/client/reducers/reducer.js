export default class Reducer {

	static create(reducer) {
		return (state = reducer, action) => {
			const { type } = action
			return reducer[type] ? reducer[type](state, action) : reducer.merge(state)
		}
	}
}
