import styled from 'styled-components'
import { colors } from '../../styles'

export const ContainerCard = styled.div`
  width: 250px;
  height: 500px;
  padding: 0.5em;
  background: ${colors.firstBlue};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  span {
    color: white;
  }

  :hover {
    border: 3px solid ${colors.secondBlue};
  }
`

export const ButtonAlbums = styled.button`
  width: 200px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  size: 70px;
  color: white;
  font-size: 1em;
  background: ${colors.pink};
  cursor: pointer;
`
