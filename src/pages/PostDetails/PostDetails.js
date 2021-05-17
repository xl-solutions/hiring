import React, { useState, useEffect } from 'react';
import styles from './PostDetails.module.sass';

import request from '../../utils/request';
import CommentItem from '../../components/CommentItem';
import { Redirect } from 'react-router';

const PostDetails = (props) => {
    // this.props.match.params.user;
    const [post, setPost] = useState({
        "userId": '',
        "id": '',
        "title": "",
        "body": ""
        });
    const [comments, setComments] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [titleText, setTitleText] = useState('');
    const [bodyText, setBodyText] = useState('');

    async function getPost(){
        const post = await request({
            url: `/posts/${props.match.params.post}`,
            method: 'GET',
        })
        setPost(post.data);
        setTitleText(post.data.title);
        setBodyText(post.data.body);
    }
    async function getComments(){
        const comments = await request({
            url: `/posts/${props.match.params.post}/comments`,
            method: 'GET',
        })
        setComments(comments.data);
    }

    const editPostSubmit = () => {
        console.log(titleText);
        async function attPost(){
            const att = await request({
                url: `/posts/${props.match.params.post}`,
                method: 'PATCH',
                dados: {
                    title: titleText,
                    body: bodyText
                }
            })
            setPost(att.data);
        }
        attPost();
        editPostCancel();
    }

    const deletePost = () => {
        async function delPost(){
            const att = await request({
                url: `/posts/${props.match.params.post}`,
                method: 'DELETE',
            })
        }
        delPost();
        props.history.push(`/posts/${props.match.params.user}`);
        // a requisicao de delete ocorre normalmente, o redirect para a pagina ainda mostra o post por causa do funcionamento da api que nao exclui de verdade o post
    }

    const editPostCancel = () => {
        setIsEditing(false);
    }
    
    const editPost = () => {
        setIsEditing(true);
    }


    useEffect(() => {
        getPost();
        getComments();
    }, []);
    
    var inputTitle,inputBody,button;

    if(isEditing == true){
        inputTitle = <input 
                    type="text" 
                    defaultValue={post.title} 
                    onKeyUp={(event) => {
                        setTitleText(event.target.value);
                        if (event.key === 'Enter') editPostSubmit();
                        if (event.key === 'Escape') editPostCancel();
                    }} 
                />;
        inputBody = <textarea 
                    defaultValue={post.body}
                    onKeyUp={(event) => {
                        setBodyText(event.target.value);
                        if (event.key === 'Enter') editPostSubmit();
                        if (event.key === 'Escape') editPostCancel();
                      }}
                />;
        button = <>
                        <button onClick={editPostSubmit}>Salvar</button>
                        <button onClick={editPostCancel}>Cancelar</button>
                    </>;
    }else{
        inputTitle = <h1>{post.title}</h1>;
        inputBody = <p>{post.body}</p>
        button = <>
                    <button onClick={editPost}>Editar</button>
                    <button onClick={deletePost}>Deletar</button>
                </>;
    }

    return(
        <>
        <main className="main-content" id="post-detail">
            <section className={styles['post-item']}>
                {inputTitle}
                {inputBody}
                {button}
            </section>
            <div className={styles['post-comments']}>
                <ul>
                {
                    comments != undefined 
                    ?
                    comments.map(comment => (
                        <CommentItem item={comment} key={comment.id} />
                    ))
                    :
                    <span>Nenhum comentário</span>

                }
                </ul>
            </div>
        </main>
        </>
    );
}

export default PostDetails;