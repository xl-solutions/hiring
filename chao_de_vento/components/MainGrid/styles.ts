import styled from 'styled-components'

export const MainGridContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    margin: 0.5em;
  }

  @media (min-width: 35em) {
    display: grid;
    grid-template-columns: repeat(3, 1fr); //implicit grid
  }
`
