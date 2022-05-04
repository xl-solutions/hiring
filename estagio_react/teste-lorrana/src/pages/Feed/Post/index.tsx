import { QuestionCard, PostAuthor, PostAndDescription, Comment } from "./styles";
import Profile from '../../../main/assets/icons/profile.png'
import Menu from '../../../main/assets/icons/toggle.svg'
import React, { useEffect, useState } from "react";
import Answer from "../Answer";
import { route } from "../../../services/api";
interface IPost {
    post: {
        title: string,
        userId: number,
        id: number,
        body: string
    }
}

interface IAnswers {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export const Post: React.FC<IPost> = ({post}) => {

    const [showAnswers, SetShowAnswers] = useState(false);
    const [answers, setAnswers] = useState<IAnswers[] | undefined>(undefined);
    const [showOptions, setShowOptions] = useState(false)
    const [error, setError] = useState(false)
    const [id, setId ] = useState(0)


    useEffect(() => {
        if (showAnswers === true){
            loadAnswers();
        }
    }, [showAnswers]);
    
    const loadAnswers = async () => {
      try {
        const { data } = await route.comments.list(id);
        setAnswers(data);

      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    };

    const getId = async (id: number) => {
        setId(id)
        SetShowAnswers(!showAnswers)
    }

    const openMenu = () => setShowOptions(!showOptions)

    const deletePost = async (id: number) => {
        const { data }  = await route.posts.delete(id);
        alert("Post escluído")
        
    }

    return(
        <>           
            <QuestionCard key={post?.id}>
                <PostAuthor>
                    <img src={Profile} alt="imagem de Perfil"/>
                    <strong>{post?.userId}</strong>
                    <div className="options">
                        <img src={Menu} alt="Ícone indicando Menu" className="options" onClick={openMenu}/>
                        { showOptions ? 
                            <div className="toggleOptions">
                                <>
                                {console.log(post.id)}
                            
                                </>
                                <p onClick={() => deletePost(post?.id)}>Excluir</p>
                            </div>
                        : null}
                    </div> 
                </PostAuthor>
                <PostAndDescription>
                    <strong>{post?.title}</strong>
                    <p>{post.body}</p> 
                </PostAndDescription>
                <Comment>
                    <h3 onClick={() => getId(post.id)}>
                        Comentários
                    </h3>
                    { showAnswers &&  
                        <>
                            {answers?.length && answers.map((answers) => {
                                return <Answer postId={answers.postId} name={answers.name} 
                                            email={answers.email} body={answers.body} id={answers.id}
                                        />
                            }
                            )}
                        
                        </>
                    }
                    <form>
                        <textarea
                            placeholder="Escreva um comentário..."
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