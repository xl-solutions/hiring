import styled from 'styled-components/native';
import { Fontisto } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: RFValue(20),
    paddingBottom: RFValue(20),
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;

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

export const Footer = styled.View`
  padding: ${({ theme }) => RFValue(theme.card.paddingDefault)}px;

  background-color: ${({ theme }) => theme.screen.background};
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${({ theme }) => RFValue(theme.fontScale.xs)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: center;

  color: ${({ theme }) => theme.neutralColors.dark['dark-dark']};
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SemiBold};
  font-weight: 600;
  font-size: ${({ theme }) => RFValue(theme.fontScale.xxs)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: center;

  color: ${({ theme }) => theme.neutralColors.dark['dark-light']};
`;

export const Icon = styled(Fontisto)``;
