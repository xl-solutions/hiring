import React, { useEffect, useState } from 'react';
import { User } from '../../service/user';
import { Container } from './styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { getUserRepos, Repo } from '../../service/repository';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface UserInfoProps {
  user: User;
}

function UserInfo(props: UserInfoProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const { user } = props;

  useEffect(() => {
    const fetchRepos = async () => {
      const repos = await getUserRepos(user.login);
      setRepos(repos);
    };
    fetchRepos();
  });

  return (
    <Container>
      <header>
        <img src={user.avatar_url} alt="" />
        <span>{user.name}</span>
      </header>
      <List>
        {repos.map(repo => {
          return (
            <ListItem>
              <a>
                <OpenInNewIcon />
                {repo.name}
              </a>
              <label htmlFor="clone-url">
                Clone url:
                <span className="clone-url">{repo.clone_url}</span>
                <ContentCopyIcon onClick={()=>{
                  navigator.clipboard.writeText(repo.clone_url);
                  alert("Url copiada para área de transferência" );
                }}/>
              </label>
              <label htmlFor="repo-url">
                URL do repositório:
                <a className="repo-url" href={repo.html_url} target="_blank">
                  {repo.html_url}
                </a>
              </label>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default UserInfo;
