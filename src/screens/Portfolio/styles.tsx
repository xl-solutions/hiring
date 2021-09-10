import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type PortfolioProps = {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
};

export const Container = styled.View`
  flex: 1;
`;

export const ListPortfolio = styled(
  FlatList as new () => FlatList<PortfolioProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 20, paddingVertical: 20 },
})`
  width: 100%;
  padding: 0px;
  background-color: ${({ theme }) => theme.screen.background};
`;

export const PortfolioContainer = styled.View`
  padding: ${RFValue(10)}px;
  margin: ${RFValue(10)}px;

  border-radius: ${({ theme }) => RFValue(theme.card.borderRadius)}px;

  background-color: ${({ theme }) => theme.card.backgroundLighter};
`;

export const TitleText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${({ theme }) => RFValue(theme.fontScale.xs)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: left;

  color: ${({ theme }) => theme.neutralColors.dark['dark-darker']};
`;
