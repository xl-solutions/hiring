import styled from 'styled-components';

export const StyledInputLabel = styled.label`
  margin: 0 10px;
`;

export const StyledInputDate = styled.input.attrs({
  type: 'date',
})`
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #555;
  font-size: 1.075rem;
  padding: 10px 15px;
`;
