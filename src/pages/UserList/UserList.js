import React, { Component } from 'react';
import styles from './UserList.module.sass';

import {
    UserListItem
  } from '../../components/UserListItem';

import request from '../../utils/request';

class UserList extends Component {

    state = {
        users: []
    };

    async componentDidMount(){
        const response = await request({
            url: '/users/',
            method: 'GET',
        })

        console.log(response.data);

        this.setState({users: response.data});
    };


    render(){
        return(
            <>
            <main className="main-content" id="list">
                <h1 className="title">Lista de Usuários</h1>

                <section>
                    <ul className={styles['user-list']}>
                        {
                            this.state.users.map(user => (
                                <UserListItem item={user} key={user.id} />
                            ))
                        }
                    </ul>
                </section>
            </main>
            </>
        );
    }
}

export default UserList;