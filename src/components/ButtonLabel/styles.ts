import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

type RectButtonProps = {
  color: boolean;
};
export const Container = styled(RectButton)<RectButtonProps>`
  align-items: center;
  justify-content: center;

  padding: ${RFValue(12)}px ${RFValue(28)}px ${RFValue(14)}px;
  width: 100%;
  height: ${RFValue(48)}px;

  border-radius: ${({ theme }) => RFValue(theme.card.borderRadius)}px;

  background-color: ${({ theme, color }) =>
    color ? theme.uiColors['success-default'] : theme.uiColors['info-default']};
`;

export const TitleButton = styled.Text.attrs({ numberOfLines: 1 })`
  font-family: ${({ theme }) => theme.fonts.SemiBold};
  font-weight: 600;
  font-size: ${({ theme }) => RFValue(theme.fontScale.sm)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: center;

  color: ${({ theme }) => theme.neutralColors.light['light-light']};
`;
