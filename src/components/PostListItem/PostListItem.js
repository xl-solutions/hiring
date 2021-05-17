import React from 'react';
import styles from './PostListItem.module.sass';
import { Link } from "react-router-dom";

const PostListItem = ({ item }) => (
    <li className={styles['post-list-item']}>
        <Link to={`/posts/${item.userId}/${item.id}`}>
        <span>{item.title}</span>
        <p>{item.body}</p>
        </Link>
    </li>
);

export default PostListItem;