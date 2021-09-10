import React from 'react';
import { useTheme } from 'styled-components/native';

import avatarUser from '../../assets/perfil.png';

import { Container, AvatarImage, Gradient } from './styles';

function ProfileAvatar() {
  const { uiColors } = useTheme();
  const primaryColor = uiColors['info-default'];
  const secondaryColor = uiColors['success-default'];

  return (
    <Container>
      <Gradient
        colors={[primaryColor, secondaryColor]}
        start={[0, 0]}
        end={[1, 1]}>
        <AvatarImage source={avatarUser} />
      </Gradient>
    </Container>
  );
}

export { ProfileAvatar };
