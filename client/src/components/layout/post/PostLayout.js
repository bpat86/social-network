import React, { Component } from 'react';
import NavBar from '../../layout/NavBar';
import Post from '../../post/Post';
import Footer from '../../layout/Footer';

class PostLayout extends Component {
    render() {
        return (
            <div className="post-layout">
            	<NavBar {...this.props} />
				<div className="container-xl">
					<Post {...this.props} />
				</div>
				<Footer {...this.props} />
            </div>
        );
    }
}

export default PostLayout;
