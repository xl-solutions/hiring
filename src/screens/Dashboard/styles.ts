import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: 40px;
  color: #333;
  text-align: center;
`;
