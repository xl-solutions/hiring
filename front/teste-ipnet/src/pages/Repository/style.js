import styled from 'styled-components';

export const IssuesNavbar = styled.div`
    display: flex;
    background-color: #24292E;
    height: 100px;
    justify-content: center;
`;

export const RepoTitle = styled.h1`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: lighter;
    color: white;
    padding: 30px;
    font-size: 22pt;
`;

export const IssuesContainer = styled.div`
    display: flex;
    flex-direction:column;
    padding: 0;
    margin: 0;
    justify-content: center;
`;

export const Issues = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const IssueTitle = styled.h3`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: lighter;
    color: white;
    padding: 15px;
    
`;

export const Warning = styled.h2`
    color: red;
`;