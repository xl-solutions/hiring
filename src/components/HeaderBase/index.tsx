import { useNavigation } from '@react-navigation/native';
import React from 'react';

import {
  Header,
  HeaderIcon,
  HeaderTitle,
  BoxLeft,
  BoxCenter,
  BoxRight,
  ButtonGoBack,
} from './styles';

interface IHeaderBase {
  title: string;
  icon?: boolean;
}
const HeaderBase = ({ title, icon = true }: IHeaderBase) => {
  const navigation = useNavigation();

  function handlerNavigation() {
    navigation.goBack();
  }

  return (
    <Header>
      <BoxLeft>
        {icon && (
          <ButtonGoBack onPress={handlerNavigation}>
            <HeaderIcon name="arrow-back-ios" />
          </ButtonGoBack>
        )}
      </BoxLeft>
      <BoxCenter>
        <HeaderTitle>{title}</HeaderTitle>
      </BoxCenter>
      <BoxRight />
    </Header>
  );
};

export { HeaderBase };
