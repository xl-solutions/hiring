import React from 'react';
import styles from './CommentItem.module.sass';

const CommentItem = ({ item }) => (
    <li className={styles['comment-item']}>
        <span>{item.email}</span>
        <p>{item.body}</p>
    </li>
);

export default CommentItem;