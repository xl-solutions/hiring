import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

type InputProps = {
  error: boolean;
  isFocused: boolean;
};

type IconProps = {
  error: boolean;
};

export const Container = styled.View`
  padding: 0;
  padding-bottom: ${RFValue(16)}px;
  background-color: transparent;
`;

export const FieldContainer = styled.View<InputProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: ${RFValue(50)}px;

  padding: 0 ${RFValue(27)}px;

  background-color: ${({ theme }) => theme.neutralColors.light['light-light']};

  border-radius: ${({ theme }) => theme.card.borderRadiusLarge}px;
  border-style: solid;

  ${({ error }) =>
    error &&
    css`
      border-width: ${RFValue(2)}px;
      border-color: ${({ theme }) => theme.uiColors['danger-default']};
    `}

  ${({ isFocused, error }) =>
    isFocused &&
    !error &&
    css`
      border-width: ${RFValue(2)}px;
      border-color: ${({ theme }) => theme.uiColors['info-default']};
      background-color: ${({ theme }) => theme.uiColors['info-lighter']};
    `}
`;

export const IconInput = styled(Feather)<IconProps>`
  font-size: ${RFValue(18)}px;
  color: ${({ theme, error }) =>
    error
      ? theme.uiColors['danger-default']
      : theme.neutralColors.dark['dark-light']};
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.Medium};
  font-weight: 500;
  font-size: ${({ theme }) => RFValue(theme.fontScale.xxxs)}px;

  line-height: ${RFValue(14.4)}px;
  font-style: normal;
  text-align: left;

  padding-top: ${RFValue(4)}px;
  padding-left: ${RFValue(24)}px;
  color: ${({ theme }) => theme.uiColors['danger-default']};
`;
