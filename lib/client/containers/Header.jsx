import { Link } from 'react-router'
import React, { Component, PropTypes } from 'react'
import PostsActions from '../actions/posts_actions'
import InlineSearchForm from '../components/forms/InlineSearchForm.jsx'

export default class Header extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    onSearchSubmit(data) {
        this.props.dispatch(PostsActions.fetchPosts(data))
    }

    render() {
        return (
            <nav ref="nav" className="navbar navbar-light bg-faded navbar-fixed-top">
                <InlineSearchForm onSubmit={this.onSearchSubmit.bind(this)} />
                <ul className="nav navbar-nav pull-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="fa fa-home"></i> Home
                        </Link>                    
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/favorites">
                            <i className="fa fa-heart"></i> Favorites
                        </Link>
                    </li>                
                </ul>                
            </nav>
        )
    }

}
