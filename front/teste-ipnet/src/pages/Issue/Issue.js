import React from 'react';
import { Issues } from '../Repository/style';
import { IssueDesc, IssueHeader, Logo } from './style';
import logo from '../../imgs/github-logo-white.png'


// import { Container } from './styles';

function Issue(props) {
    console.log(props);
    const { issue, repoName } = props.location.state;
    console.log({ issue })
    return (
        <div>
            <IssueHeader>
                <a href="/">
                    <Logo src={logo} />
                </a>
                <h2>Issue {issue.title} do repositorio {repoName}</h2>
            </IssueHeader>
            <br />
            <IssueDesc>Descrição: {issue.body}</IssueDesc>
        </div>
    );
}

export default Issue;
