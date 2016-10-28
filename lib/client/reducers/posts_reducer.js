import Immutable, { List, Map, Record } from 'immutable'
import Types from '../constants/types'
import Reducer from './reducer'

const schema = {
	isFetching: false,
	results: List(),
	content: Map()
}

class PostsReducer extends Record(schema) {

	[Types.FETCH_POSTS](state) {
		return this.merge(state)
			.set('isFetching', true)
			.set('results', List())			
			.set('content', Map())
	}

	[Types.FETCH_POSTS_ERROR](state, action) {
		return this.merge(state)
			.set('isFetching', false)
	}

	[Types.FETCH_POSTS_RESULT](state, action) {
		const content = {}
		const postIds = List((action.posts || []).map(post => {
			const id = post.id.toString()
			content[id] = Immutable.fromJS(post)
			return id
		}))
		return this.merge(state)
			.set('content', Immutable.fromJS(content))
			.set('results', postIds)
			.set('isFetching', false)
	}

}

export default Reducer.create(new PostsReducer())
