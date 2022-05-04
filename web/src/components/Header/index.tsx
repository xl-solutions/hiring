import { Container, IconSearch, Logo, Portfolio, SearchBox } from "./styles";
import { RiSearchLine } from 'react-icons/ri';
import { BsCurrencyExchange } from 'react-icons/bs';

export function Header() {
  return (
    <Container>
      <Logo to="/">
        dashmoney
        <span>.</span>
      </Logo>
      <SearchBox>
        <input placeholder="Pesquise por ativos na plataforma"></input>
        <IconSearch as={RiSearchLine} />
      </SearchBox>

      <Portfolio to="/portfolio">
        <div>
          <strong>Meu Portfólio</strong>
          <span data-testid="cart-size">
            10 itens
          </span>
        </div>
        <BsCurrencyExchange size={36} color="#008FFB" />
      </Portfolio>
    </Container>
  )
}