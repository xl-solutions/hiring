import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { Container } from './styles';
import { getRepoIssues } from '../../service/repository';
import { List, ListItem } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Issue } from '../../service/issue';

function Issues() {
  const { owner, repo } = qs.parse(location.search);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      if (typeof owner === 'string' && typeof repo === 'string') {
        const issuesData = await getRepoIssues(owner, repo);
        setIssues(issuesData);
      }
    };
    fetchIssues();
  }, []);

  return (
    <>
      {owner && repo && (
        <Container>
          <a href="/">
            <ArrowBackIosIcon />
            Voltar
          </a>
          <header>
            <h1>{owner}</h1>
            <span>{repo}</span>
          </header>
          <List
            sx={{
              overflow: 'auto',
              maxHeight: 900,
            }}
          >
            {issues.map(issue => {
              return (
                <ListItem>
                  <a
                    href={`issue?owner=${owner}&repo=${repo}&issue_number=${issue.number}`}
                  >
                    <span>Issue:</span>
                    {issue.title}
                  </a>
                </ListItem>
              );
            })}
          </List>
        </Container>
      )}
    </>
  );
}

export default Issues;
