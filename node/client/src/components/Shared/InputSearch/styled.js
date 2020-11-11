import styled from 'styled-components';

const StyledInputSearch = styled.input.attrs({
  type: 'search',
})`
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #555;
  font-size: 1.075rem;
  padding: 10px 15px;
`;

export default StyledInputSearch;
