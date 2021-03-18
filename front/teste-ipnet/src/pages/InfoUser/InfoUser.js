import React from 'react';
import { useHistory } from 'react-router-dom';
import Label from '../../components/Label';
import logo from '../../imgs/github-logo-white.png'
import { AvatarImg, NameTag, UserContainer, Navbar, Repositorios, TitleOwner, LogoRepo } from './style';

function InfoUser(props) {
    const history = useHistory();
    console.log(props);
    const { user } = props.location.state;
    return (
        <>
            <Navbar>
                <a href="/">
                    <LogoRepo src={logo} />
                </a>
                <TitleOwner>Repositorios de {user.name}</TitleOwner>
            </Navbar>
            <Repositorios>
                {user.listaRepos.map((repo, index) => (
                    <div key={index} style={{ cursor: "pointer" }} onClick={() => history.push({
                        pathname: `/repo/${repo.full_name}`,
                        state: { repo }
                    })}>
                        <AvatarImg
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login}
                        />
                        <Label label="Nome repo:">
                            <strong>{repo.full_name}</strong>
                        </Label>
                        <Label label="Link para clonar">
                            <p>{repo.clone_url}</p>
                        </Label>
                    </div>

                ))}
            </Repositorios>
        </>
    );
}

export default InfoUser;