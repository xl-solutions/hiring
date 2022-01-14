import React, { useEffect } from 'react';

import { Alert } from '@material-ui/lab';

import AlertTitle from '@material-ui/lab/AlertTitle';
import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // execute function if component die
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container style={style}>
      <Alert severity={message.type} variant="filled">
        <AlertTitle>{message.title}</AlertTitle>
        {message.description}
      </Alert>
    </Container>
  );
};

export default Toast;
