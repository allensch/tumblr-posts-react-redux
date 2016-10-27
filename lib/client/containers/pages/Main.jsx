import React, { Component } from 'react'
import Redux from '../../utils/redux'
import Loader from '../../components/widgets/Loader.jsx' 
import PostItem from '../../components/items/PostItem.jsx'
import FavoriteActions from '../../actions/favorite_actions'

class Main extends Component {

    static mapStateToProps(state) {
        const { content, results } = state.posts
        return {
            posts: results.map(id => {
                return content.get(id).toJS()
            }).toArray()
        }
    }

    addToFavorites(post) {
        this.props.dispatch(FavoriteActions.addPost(post))
    }

    renderPosts() {
        return this.props.posts.map((post, index) => {
            return (
                <div className="col-md-4 col-sm-6" key={index}>
                    <PostItem data={post} onClick={this.addToFavorites.bind(this)} />
                </div>
            )
        })
    }

    renderNoPosts() {
        return (
            <div className="text-xs-center">
                <h2 className="text-muted">No posts to show :(</h2>
                <h3 className="text-muted">Search for something!</h3>
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
        const { isFetching } = this.props
        return (
            <div className="container">
                <Loader position="absolute" scale=".5" hwaccel={true} isLoading={isFetching} />
                <div className="row">
                    {this.renderContent()}
                </div>
            </div>
        )
    }

}

export default Redux.connect(Main)
