import Immutable, { List, Map, Record } from 'immutable'
import Types from '../constants/types'
import Reducer from './reducer'

const schema = {
	ids: List()
}

class FavoritesReducer extends Record(schema) {

	[Types.ADD_TO_FAVORITES](state, action) {
		return this.merge(state)
			.set('ids', state.ids.insert(0, action.post.id.toString()))
	}

	[Types.REMOVE_FROM_FAVORITES](state, action) {
		const index = state.ids.indexOf(action.post.id.toString())
		return this.merge(state)
			.set('ids', state.ids.delete(index))
	}

}

export default Reducer.create(new FavoritesReducer())
