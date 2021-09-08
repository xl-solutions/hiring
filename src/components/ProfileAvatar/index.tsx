import React from 'react';

import { theme } from '../../globals/styles/theme';
import avatarUser from '../../assets/perfil.png';

import { Container, AvatarImage, Gradient } from './styles';

function ProfileAvatar() {
  const primaryColor = theme.brandColors['gradients-01'];
  const secondaryColor = theme.brandColors['gradients-02'];

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
