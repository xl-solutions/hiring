import React, { useState } from 'react';
import { FormContainer } from './style';
import api from '../serviceConfig';
import { useHistory } from 'react-router-dom';

function Form(props) {
    
    const history = useHistory();
    const [username, setUsername] = useState("");
    async function handleSubmit() {
        try {
            const response = await api.get("users/" + username);
            if(response){
                const { login, avatar_url } = response.data;
                console.log({login, avatar_url})
                const repoResponse = await api.get("users/" + username + "/repos");
                if(repoResponse){
                    const listaRepos = repoResponse.data
                    history.push({
                        pathname: "/details",
                        state: { user: { name: login, avatar_url, listaRepos } }
                    });
                }
            }
        } catch (error) {
            throw error;
        }
    }

    return(
       <FormContainer>
           <label>Digite o nome do usuário do GitHub:</label>
           <input type="text" onChange={(event) => setUsername(event.target.value)}/>
           <button onClick={handleSubmit}>Buscar</button>
       </FormContainer>
   );
}

export default Form;