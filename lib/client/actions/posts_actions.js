import Fetch from '../utils/fetch'
import Types from '../constants/types'

export default class PostActions {

	static  _fetchPostsListing() {
		return { type: Types.FETCH_POSTS }
	}

	static _errorPostsListing(error) {
		return { type: Types.FETCH_POSTS_ERROR, error }
	}

	static _resultPostsListing(posts) {
		return { type: Types.FETCH_POSTS_RESULT, posts }
	}

	static fetchPosts(query) {
		return dispatch => {
			dispatch(this._fetchPostsListing())
			Fetch.postJSON('/api/search', query)
				.then(posts => dispatch(this._resultPostsListing(posts)))
				.catch(error => dispatch(this._errorPostsListing(error)))
		}
	}

}
