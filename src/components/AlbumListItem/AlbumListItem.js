import React from 'react';
import styles from './AlbumListItem.module.sass';
import { Link } from "react-router-dom";

const AlbumListItem = ({ item, user }) => (
    <li className={styles['album-list-item']}>
        <Link to={`/albums/${user}/${item.id}`}>
        <span>{item.title}</span>
        </Link>
    </li>
);

export default AlbumListItem;