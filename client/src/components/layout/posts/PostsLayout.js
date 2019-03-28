import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Posts from '../../posts/Posts';
import Footer from '../../layout/Footer';

class PostsLayout extends Component {
    render() {
        return (
            <div className="posts-layout">
            	<NavBar {...this.props} />
				<div className="container">
                    <h1 className="text-3xl text-grey-darkest mb-4">News Feed</h1>
					<Posts {...this.props} />
				</div>
				<Footer />
            </div>
        );
    }
}

export default PostsLayout;
