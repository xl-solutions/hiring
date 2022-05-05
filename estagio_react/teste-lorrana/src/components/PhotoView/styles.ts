import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: #333c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.section`
  min-width: 250px;
  min-height: 250px;
  max-height: calc(100vh - 20px);
  max-width: 600px;
  padding: 20px;
  z-index: 19;
  overflow-y: auto;
  background-color: var(--primary);
  box-shadow: 0px 0px 10px black;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

   header span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
    transition: 2s;
    
    :hover {
      color: var(--primary);
    }
  }
`;