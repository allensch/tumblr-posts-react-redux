import React, { Component } from 'react'
import Redux from '../../utils/redux'
import Loader from '../../components/widgets/Loader.jsx' 
import PostItem from '../../components/items/PostItem.jsx'
import FavoriteActions from '../../actions/favorite_actions'

class Main extends Component {

    static mapStateToProps(state) {
        const { content, results, isFetching } = state.posts
        return {
            isFetching,
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
        const { isFetching, posts } = this.props
        if (isFetching) {
            return <Loader position="absolute" hwaccel={true} isLoading={true} />
        } else if (posts && posts.length) {
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

export default Redux.connect(Main)
