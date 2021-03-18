import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    p {
        color: #474747;
        font-weight: bold;
        font-size: 11px;
    }
`;

function Label({label, children}) {
  return (
    <Container>
        <p>{label}</p>
        {children}
    </Container>
  );
}

export default Label;