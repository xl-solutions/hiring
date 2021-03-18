import { React, useEffect, useState } from 'react';
import { IssuesContainer, IssuesNavbar, RepoTitle, Issues, IssueTitle, Warning } from './style';
import api from '../../serviceConfig';

function Repository({ location, history }) {
    const [issues, setIssues] = useState([]);
    async function GetIssues() {
        const { repo } = location.state;
        try {
            const response = await api.get("repos/" + repo.full_name + "/issues");
            if (response) {
                console.log(response);
                setIssues(response.data);
            }
        } catch (error) {
            throw (error);
        }
    }

    useEffect(() => {
        GetIssues();
    }, [])

    return (
        <IssuesContainer>
            <IssuesNavbar>
                <RepoTitle>Issues do repositório {location.state.repo.full_name}:</RepoTitle>
            </IssuesNavbar>
            <Issues>
                {issues.length > 0 ? issues.map((issue) => (
                    <IssueTitle
                        style={{cursor: "pointer"}}
                        key={issue.id}
                        onClick={() => history.push({
                            pathname: `/issue/${location.state.repo.full_name}`,
                            state: { issue, repoName: location.state.repo.full_name }
                        })}
                    >
                        {location.state.repo.full_name + " - " + issue.title}
                    </IssueTitle>
                )): <Warning>Este repositório não contém issues</Warning>}
            </Issues>
        </IssuesContainer>
    )
}

export default Repository;