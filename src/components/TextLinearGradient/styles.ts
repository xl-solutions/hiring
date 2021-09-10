import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SemiBold};
  font-size: ${({ theme }) => theme.fontScale.sm}px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  line-height: ${RFValue(23.6)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.SemiBold};
  font-weight: 600;
  font-size: ${({ theme }) => RFValue(theme.fontScale.md)}px;

  line-height: ${RFValue(21.6)}px;
  font-style: normal;
  text-align: center;

  color: ${({ theme }) => theme.neutralColors.dark['dark-dark']};
`;
