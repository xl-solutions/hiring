import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View } from 'react-native';

import {
  ContainerAction,
  ContainerLeft,
  NameAction,
  BoxLeftAction,
  SymbolActionText,
  RegionActionText,
  BoxRightAction,
  MarketOpenText,
  MarketCloseText,
  ContainerRight,
  PriceActionText,
  IconMoney,
  MatchScoreText,
} from './styles';

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

type Props = {
  item: BestMatches;
};

function ActionItem({ item }: Props) {
  const { navigate } = useNavigation();

  function navigationDetails(symbol: string) {
    navigate('DetailsAction', {
      symbol,
    });
  }

  return (
    <ContainerAction
      key={item['1. symbol']}
      onPress={() => navigationDetails(item['1. symbol'])}>
      <ContainerLeft>
        <NameAction>{item['2. name']}</NameAction>
        <BoxLeftAction>
          <SymbolActionText>{item['1. symbol']} </SymbolActionText>
          <RegionActionText>{item['4. region']}</RegionActionText>
        </BoxLeftAction>
        <BoxRightAction>
          <MarketOpenText>Abre {item['5. marketOpen']}</MarketOpenText>
          <MarketCloseText>Fecha {item['6. marketClose']}</MarketCloseText>
        </BoxRightAction>
      </ContainerLeft>
      <ContainerRight>
        <PriceActionText>{item['8. currency']}</PriceActionText>
        <View>
          <IconMoney color="#388" />
          <MatchScoreText>{item['9. matchScore']}</MatchScoreText>
        </View>
      </ContainerRight>
    </ContainerAction>
  );
}

export { ActionItem };
