import React, { Component } from 'react';
import styles from './PostList.module.sass';

import {
    PostListItem
  } from '../../components/PostListItem';

import request from '../../utils/request';

class PostList extends Component {

    state = {
        posts: []
    };

    async componentDidMount(){
        const response = await request({
            url: `/users/${this.props.match.params.id}/posts`,
            method: 'GET',
        })

        console.log(response.data);

        this.setState({posts: response.data});
    };


    render(){
        return(
            <>
            <main className="main-content" id="list">
                <h1 className="title">Posts</h1>

                <section>
                    <ul className={styles['post-list']}>
                        {
                            this.state.posts.map(post => (
                                <PostListItem item={post} key={post.id} />
                            ))
                        }
                    </ul>
                </section>
            </main>
            </>
        );
    }
}

export default PostList;