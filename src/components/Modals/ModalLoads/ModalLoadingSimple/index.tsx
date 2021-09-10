import React from 'react';
import { Modal, ModalProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Loading } from './styles';

function ModalLoadingSimple({ ...rest }: ModalProps) {
  const { uiColors } = useTheme();
  return (
    <Modal {...rest} transparent animationType="none" animated>
      <Container>
        <Loading color={uiColors['info-default']} size={50} />
      </Container>
    </Modal>
  );
}

export { ModalLoadingSimple };
