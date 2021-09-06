import styled from 'styled-components/native';
import { FlatList } from 'react-native';
// import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

type AccountProps = {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
};

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-size: 40px;
  color: #333;
  text-align: center;
`;

export const LitActionsMercado = styled(
  FlatList as new () => FlatList<AccountProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 0, paddingVertical: 0 },
})`
  width: 100%;
  padding: 0px;
  background-color: ${({ theme }) => theme.screen.background};
`;
