import React, { Component } from 'react'
import Redux from '../../utils/redux'
import FavoriteActions from '../../actions/favorite_actions'
import FavoriteItem from '../../components/items/FavoriteItem.jsx'

class Favorites extends Component {

    static mapStateToProps(state) {
        const { content } = state.posts
        const { ids } = state.favorites
        return {
            posts: ids.map(id => {
                return content.get(id).toJS()
            }).toArray()
        }
    }

    removeFromFavorites(post) {
        this.props.dispatch(FavoriteActions.removePost(post))
    }

    renderPosts() {
        return this.props.posts.map((post, index) => {
            return (
                <div className="col-md-4 col-sm-6" key={index}>
                    <FavoriteItem data={post} onClick={this.removeFromFavorites.bind(this)} />                
                </div>
            )
        })
    }

    renderNoPosts() {
        return (
            <div className="text-xs-center">
                <h2 className="text-muted">No favorites in here :(</h2>
            </div>
        )
    }

    renderContent() {
        const { posts } = this.props
        if (posts && posts.length) {
            return this.renderPosts()
        }
        return this.renderNoPosts()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderContent()}
                </div>
            </div>
        )
    }

}

export default Redux.connect(Favorites)
