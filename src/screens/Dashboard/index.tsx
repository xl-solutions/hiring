import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { InputFormController } from '../../components/InputFormController';
import { StatusBarBase } from '../../components/StatusBarBase';
import { useFetch } from '../../hooks/search';

import { Container, LitActionsMercado, Title } from './styles';

function Dashboard() {
  const { search } = useFetch();
  const { statusBar } = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const loadingSearch = useCallback(
    async (event: string): Promise<Function> => {
      const handler = setTimeout(async () => {
        await search(event);
      }, 600);

      return () => {
        clearImmediate(handler);
      };
    },
    [search],
  );

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <StatusBarBase
          barStyle="dark-content"
          backgroundColor={statusBar.backgroundDefault}
          animated
          translucent={false}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <InputFormController
              placeholder="buscar"
              name="search"
              isFocused={isFocused}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              iconName="search"
              onChangeText={text => loadingSearch(text)}
            />
            <Title>Dashboard</Title>
            {/* <LitActionsMercado /> */}
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

export { Dashboard };
