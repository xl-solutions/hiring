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
    const [reload, setReload] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const loadPosts = async () => {
        try {
          setIsLoading(true)

          const { data } = await route.posts.list();
          setPosts(data);

        } catch (error: any) {
          console.log(error);
          setError(error.message);

          setIsLoading(false)
        }
      };
      loadPosts();

    }, [reload]);

    return(
        <>
            <DefaultLayout>
                <Container>
                    <h1>Publicações Recentes</h1>
                    {posts?.length && posts.map((post) => (
                        <Post post={post} />
                    ))}
                </Container>
            </DefaultLayout>
        </>
    );
}

export default Feed;