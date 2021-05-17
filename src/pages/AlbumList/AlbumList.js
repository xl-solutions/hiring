import React, { Component } from 'react';
import styles from './AlbumList.module.sass';

import {
    AlbumListItem
  } from '../../components/AlbumListItem';

import request from '../../utils/request';

class AlbumList extends Component {

    state = {
        albums: []
    };

    async componentDidMount(){
        const response = await request({
            url: `/users/${this.props.match.params.id}/albums`,
            method: 'GET',
        })

        this.setState({albums: response.data});
    };


    render(){
        return(
            <>
            <main className="main-content" id="list">
                <h1 className="title">Lista de Albums</h1>

                <section>
                    <ul className={styles['album-list']}>
                        {
                            this.state.albums.map(album => (
                                <AlbumListItem item={album} key={album.id} user={this.props.match.params.id} />
                            ))
                        }
                    </ul>
                </section>
            </main>
            </>
        );
    }
}

export default AlbumList;