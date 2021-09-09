import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;

  border-radius: ${({ theme }) => theme.card.borderRadiusLarge}px;
`;

export const Gradient = styled(LinearGradient)`
  align-items: center;
  justify-content: center;

  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;

  border-radius: ${({ theme }) => theme.card.borderRadiusLarge}px;
`;

export const AvatarImage = styled.Image`
  width: ${RFValue(37)}px;
  height: ${RFValue(37)}px;

  border-radius: ${({ theme }) => theme.card.borderRadiusLarge}px;
  border-width: ${RFValue(1.5)}px;
  border-color: ${({ theme }) => theme.card.backgroundDefault};
`;
