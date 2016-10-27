import Types from '../constants/types'

export default class FavoriteActions {

	static addPost(post) {
		return { type: Types.ADD_TO_FAVORITES, post }
	}

	static removePost(post) {
		console.log('remove post', post)
		return { type: Types.REMOVE_FROM_FAVORITES, post }
	}

}
