import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 68px;

  label {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: #007eff;
    max-height: 20px;
    font-size: 14px;
  }

  & + input {
    margin-top: 8px;
  }

  input {
    flex: 1;
    font-size: 14px;
    background: transparent;
    font-weight: 600;
    border: 3px solid #007eff;
    border-radius: 4px;
    color: #007eff;
    height: 40px;
    padding: 0 12px;

    &::placeholder {
      color: #666360;
    }
  }
`;
