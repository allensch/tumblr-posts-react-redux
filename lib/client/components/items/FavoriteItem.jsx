import React from 'react'
import PostItem from './PostItem.jsx'

export default class FavoriteItem extends PostItem {

	renderButton() {
		return (
			<button className="btn btn-secondary" onClick={this.onButtonClick.bind(this)}>
				Remove from Favorites
			</button>
		)
	}

}
