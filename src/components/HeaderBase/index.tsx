import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ProfileAvatar } from '../ProfileAvatar';
import { TextLinearGradient } from '../TextLinearGradient';

import {
  Header,
  HeaderIcon,
  BoxLeft,
  BoxCenter,
  BoxRight,
  ButtonGoBack,
} from './styles';

interface IHeaderBase {
  title: string;
  icon?: boolean;
  avatar?: boolean;
}
const HeaderBase = ({ title, icon = true, avatar = false }: IHeaderBase) => {
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
        {!icon && avatar && <ProfileAvatar />}
      </BoxLeft>
      <BoxCenter>
        <TextLinearGradient>{title}</TextLinearGradient>
      </BoxCenter>
      <BoxRight />
    </Header>
  );
};

export { HeaderBase };
