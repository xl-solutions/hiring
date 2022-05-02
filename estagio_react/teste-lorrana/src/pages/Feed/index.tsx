import { useEffect, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { route } from "../../services/api";
import Post from "./Post";
import { Container } from "./styles";

interface IPost {
    title: string,
    userId: number,
    id: number,
    body: string
}

export function Feed(){

    const [posts, setPosts ] = useState<IPost[] | undefined>(undefined);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPosts();
      }, [posts]);
    

    const loadPosts = async () => {
        try {
          const { data } = await route.posts.list();

          setPosts(data);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
      };

    return(
        <>
            <DefaultLayout>
                <Container>
                    <h1>Publicações Recentes</h1>
                    {posts?.length && posts.map((post) => (
                        <Post {...post} />
                    ))}
                </Container>
            </DefaultLayout>
        </>
    );
}

export default Feed;