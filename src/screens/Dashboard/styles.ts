import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
// import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

type BestMatches = {
  [key in BestMatchesAttributions]: string;
};

type BestMatchesAttributions =
  | '1. symbol'
  | '2. name'
  | '3. type'
  | '4. region'
  | '5. marketOpen'
  | '6. marketClose'
  | '7. timezone'
  | '8. currency'
  | '9. matchScore';

export const Container = styled.View`
  flex: 1;

  padding: ${RFValue(10)}px ${RFValue(20)}px 0 ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.screen.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: ${({ theme }) => RFValue(theme.fontScale.md)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: left;

  color: ${({ theme }) => theme.neutralColors.dark['dark-light']};
`;

export const LitActionsMercado = styled(
  FlatList as new () => FlatList<BestMatches>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 0, paddingVertical: 20 },
})`
  width: 100%;
  padding: 0px;
  background-color: ${({ theme }) => theme.screen.background};
`;
