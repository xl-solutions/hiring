import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  flex: 1;
  height: ${RFValue(46)}px;

  padding: ${RFValue(14.5)}px 0;
  margin: 0;

  font-family: ${({ theme }) => theme.fonts.Medium};
  font-weight: 500;
  font-size: ${({ theme }) => RFValue(theme.fontScale.xs)}px;

  line-height: ${RFValue(20.2)}px;
  font-style: normal;
  text-align: left;
  border-color: transparent;

  color: ${({ theme }) => theme.neutralColors.dark['dark-light']};
  background-color: transparent;
`;
