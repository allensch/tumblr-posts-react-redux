import { combineReducers } from 'redux'

import posts from './posts_reducer'
import favorites from './favorites_reducer'

const root = combineReducers({
	posts,
	favorites
})

export default root
