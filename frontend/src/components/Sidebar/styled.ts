import styled, { css } from 'styled-components';

interface ContainerProps {
  showMenu: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  position: absolute;
  top: 90px;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  z-index: 2;
  box-shadow: 0px 10px 10px 0px #000;
  background: #edfdfd;
  transition: 0.3s all;

  ${(props) =>
    props.showMenu
      ? css`
          max-width: 320px;
        `
      : css`
          width: 0;
        `}
`;
