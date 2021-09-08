import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const ContainerAction = styled(RectButton)`
  flex-direction: row;
  width: 100%;

  margin-top: ${RFValue(8)}px;

  border-radius: ${({ theme }) => theme.card.borderRadius}px;
  background-color: ${({ theme }) => theme.card.backgroundLighter};
`;

export const ContainerLeft = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;

  padding: ${RFValue(5)}px ${RFValue(10)}px;

  background-color: transparent;
`;

export const ContainerRight = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-start;

  padding: ${RFValue(5)}px ${RFValue(10)}px;

  background-color: transparent;
`;

export const BoxLeftAction = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const BoxRightAction = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

export const NameAction = styled.Text``;

export const IconMoney = styled(Feather)``;

export const PriceActionText = styled.Text``;

export const HeighText = styled.Text``;

export const LowText = styled.Text``;

export const SymbolActionText = styled.Text``;

export const RegionActionText = styled.Text``;

export const MatchScoreText = styled.Text``;

export const MarketOpenText = styled.Text``;

export const MarketCloseText = styled.Text``;
