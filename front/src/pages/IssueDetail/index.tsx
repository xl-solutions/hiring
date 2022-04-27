import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import { getIssue, Issue } from '../../service/issue';
import { Container } from './styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function IssueDetail() {
  const { owner, repo, issue_number } = qs.parse(location.search);
  const [issue, setIssue] = useState<Issue>();
  useEffect(() => {
    const fetchIssue = async () => {
      if (
        typeof owner === 'string' &&
        typeof repo === 'string' &&
        typeof issue_number === 'string'
      ) {
        const issueData = await getIssue(owner, repo, +issue_number);
        setIssue(issueData);
      }
    };
    fetchIssue();
  }, []);
  return (
    <>
    {issue && <Container>
      <a href={`/issues?owner=${owner}&repo=${repo}`}>
        <ArrowBackIosIcon />
        Voltar
      </a>
      <h1>{issue.title}</h1>
      <p>{issue.body}</p>
      <footer>
        <img src={issue.user.avatar_url} />
        <span>{issue.user.login}</span>
      </footer>
    </Container>}
    </>
  );
}

export default IssueDetail;
