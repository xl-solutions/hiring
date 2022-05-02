import { QuestionCard, PostAuthor, PostAndDescription, Comment } from "./styles";
import Profile from '../../../main/assets/icons/profile.png'
import Menu from '../../../main/assets/icons/toggle.svg'
import React from "react";


interface Post {
    title: string,
    userId: number,
    id: number,
    body: string
}


export const Post: React.FC<Post> = ({title, userId, id, body}) => {

    return(
        <>           
            <QuestionCard>
                <PostAuthor>
                    <img src={Profile} alt="imagem de Perfil"/>
                    <strong>{userId}</strong>
                    <div className="options">
                        <img src={Menu} alt="Ícone indicando Menu" className="options"/>
                    <div className="toggleOptions">
                        <p>Editar</p>
                        <p>Excluir</p>
                    </div>
                    </div> 
                </PostAuthor>
                <PostAndDescription>
                    <strong>{title}</strong>
                    <p>{body}</p> 
                </PostAndDescription>
                <Comment>
                    <h1>
                        Comentários
                    </h1>
                    <form >
                    <textarea
                        placeholder="Seja o primeiro a comentar"
                        required
                    ></textarea>
                    <button>Enviar</button>
                    </form>
                </Comment>
            </QuestionCard>         
        </>
    );
}

export default Post;