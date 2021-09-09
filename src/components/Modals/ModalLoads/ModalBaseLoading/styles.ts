import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(20)}px;

  background: rgba(0, 0, 0, 0.5);
`;

export const BoxDialog = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  padding: ${RFValue(20)}px;
  border-radius: ${({ theme }) => theme.card.borderRadius}px;

  background-color: ${({ theme }) => theme.card.backgroundDefault};
`;

export const InformationText = styled.Text`
  margin-left: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-weight: 500;
  font-size: ${({ theme }) => RFValue(theme.fontScale.xs)}px;

  line-height: ${RFValue(19.2)}px;
  font-style: normal;
  text-align: left;

  color: ${({ theme }) => theme.neutralColors.dark['dark-default']};
`;
