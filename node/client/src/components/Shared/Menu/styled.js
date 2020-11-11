import styled from 'styled-components';

export const MenuHeader = styled.header`
  width: 100%;
  padding: 5px 0;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

export const MenuList = styled.ul`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  justify-content: space-around;
`;

export const MenuListLink = styled.li`
  margin: 10px 0;

  a {
    color: #444;
    font-weight: 500;
    font-size: 1.125rem;
    text-align: center;
    transition: 0.2s;

    &:hover {
      color: #ccc;
    }
  }
`;
