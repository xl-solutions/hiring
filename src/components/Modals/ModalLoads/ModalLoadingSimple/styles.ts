import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(20)}px;

  background: rgba(0, 0, 0, 0.5);
`;

export const Loading = styled.ActivityIndicator`
  padding: ${RFValue(20)}px;

  border-radius: ${RFValue(20)}px;

  background-color: ${({ theme }) => theme.card.backgroundDefault};
`;
