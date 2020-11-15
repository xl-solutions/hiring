import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 90px;
  box-shadow: 0px 0px 10px 0px #000;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  div {
    display: flex;
    align-items: center;
    padding: 0 22px;
  }

  span {
    margin-left: 12px;
    font-size: 22px;
    color: #007eff;
  }

  svg {
    cursor: pointer;
    color: #007eff;
  }
`;
