import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;

  padding: ${({ theme }) => RFValue(theme.screen.paddingDefault)}px;

  background-color: ${({ theme }) => theme.neutralColors.light['light-light']};
`;

export const ContainerCard = styled.View`
  padding: ${RFValue(5)}px;

  border-radius: ${({ theme }) => RFValue(theme.card.borderRadius)}px;

  background-color: ${({ theme }) => theme.screen.background};
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${({ theme }) => RFValue(theme.fontScale.xs)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: left;

  color: ${({ theme }) => theme.neutralColors.dark['dark-darker']};
`;

export const Title = styled.Text`
  margin: ${RFValue(20)}px 0;

  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${({ theme }) => RFValue(theme.fontScale.md)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: left;

  color: ${({ theme }) => theme.neutralColors.dark['dark-light']};
`;
