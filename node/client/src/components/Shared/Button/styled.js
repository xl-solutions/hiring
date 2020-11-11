import styled from 'styled-components';

const StyledButton = styled.button`
  width: 220px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  border: none;
  border-radius: 8px;
  transition: all 0.2s;
  padding: 0;

  a {
    display: flex;
    width: 220px;
    height: 45px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
  }
`;

export default StyledButton;
