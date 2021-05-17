import React from 'react';
import styles from './UserListItem.module.sass';
import { Link } from "react-router-dom";

const UserListItem = ({ item }) => (
    <li className={styles['users-list-item']}>
        <span>{item.name}</span>
        <Link to={`/albums/${item.id}`}>
            Albums
        </Link>
        <Link to={`/posts/${item.id}`}>
            Posts
        </Link>
    </li>
);

export default UserListItem;