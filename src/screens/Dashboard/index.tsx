/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  View,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { ActionItem } from '../../components/ActionItem';
import { HeaderBase } from '../../components/HeaderBase';
import { InputFormController } from '../../components/InputFormController';
import { LoadButton } from '../../components/Loading/LoadButton';
import { StatusBarBase } from '../../components/StatusBarBase';
import { useFetch } from '../../hooks/fetchData';

import { Container, LitActionsMercado, Title } from './styles';

let timeOuId: any;

function Dashboard() {
  const { search, bestMatchesActions, loading } = useFetch();
  const { statusBar, neutralColors } = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();

  const debounce = (func: Function, delay: number) => {
    return (...args: any[]) => {
      if (timeOuId) {
        clearTimeout(timeOuId);
      }

      timeOuId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  async function fetchSearch(value: string) {
    await search(value);
  }

  const debounceSearch = debounce(fetchSearch, 600);

  const handleOnChange = (text: string) => {
    setSearchText(text);
    debounceSearch(searchText);
  };

  function listHeaderComponent() {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Title>Ações encontradas</Title>
        {loading ? (
          <LoadButton color={neutralColors.dark['dark-light']} size={20} />
        ) : (
          <Title style={{ marginLeft: 20 }}>
            {' '}
            {bestMatchesActions?.length}
          </Title>
        )}
      </View>
    );
  }

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
            <HeaderBase title="Google Finances" icon={false} />

            <InputFormController
              testID="test-input-search"
              placeholder="Pesquisar ações, ETFs e outros para comprar"
              name="search"
              isFocused={isFocused}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              iconName="search"
              onChangeText={event => handleOnChange(event)}

              // onChange={event => handleOnChange(event.nativeEvent.text)}
            />

            <LitActionsMercado
              testID="test-LitActionsMercado"
              data={bestMatchesActions}
              ListHeaderComponent={listHeaderComponent}
              keyExtractor={item => String(item['1. symbol'])}
              renderItem={({ item }) => <ActionItem item={item} />}
            />
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

export { Dashboard };
