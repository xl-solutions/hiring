import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Input } from '../Input';

import { Container, FieldContainer, IconInput, Error } from './styles';

interface Props extends TextInputProps {
  name: string;
  error?: string;
  iconName: React.ComponentProps<typeof Feather>['name'];
  isFocused: boolean;
}
const InputFormController = ({
  error,
  iconName,
  isFocused,
  ...rest
}: Props) => {
  return (
    <Container>
      <FieldContainer
        testID="test-fieldContainer"
        error={!!error}
        isFocused={isFocused}>
        <IconInput name={iconName} style={{ marginRight: RFValue(15) }} />
        <Input {...rest} />
        {error && (
          <IconInput
            name="alert-circle"
            error={error}
            style={{ marginLeft: RFValue(15) }}
          />
        )}
      </FieldContainer>
      {error && <Error testID="test-error">{error}</Error>}
    </Container>
  );
};

export { InputFormController };
