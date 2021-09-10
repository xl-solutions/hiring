import React from 'react';
import { ActivityIndicator, Modal, ModalProps } from 'react-native';

import { Container, BoxDialog, InformationText } from './styles';

interface Props extends ModalProps {
  children: string;
}

function ModalBaseLoading({ children, ...rest }: Props) {
  return (
    <Modal {...rest} transparent animationType="none" animated>
      <Container>
        <BoxDialog>
          <ActivityIndicator color="#5F2EE2" size={50} />
          <InformationText>{children}</InformationText>
        </BoxDialog>
      </Container>
    </Modal>
  );
}

export { ModalBaseLoading };
