import styled from 'styled-components'
import { colors } from '../../styles'

export const FooterContainer = styled.footer`
  background: ${colors.firstBlue};
  height: 100%;
  width: 100%;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100px;
      border-radius: 50%;
    }
    strong {
      color: white;
      font-weight: bold;
      font-size: 1.5em;
    }
    p {
      font-size: 1.3em;
    }
  }
`
