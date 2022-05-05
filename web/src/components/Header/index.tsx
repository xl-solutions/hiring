import { BsCurrencyExchange } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Container, Logo, Portfolio } from './styles';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../services/api';
import { SearchBar } from '../SearchBar';

export interface SearchStocksProps {
  name: string;
  company: string;
  region: string;
}

export function Header() {
  const [search, setSearch] = useState('');
  const [filterStocks, setFilterStocks] = useState<SearchStocksProps[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  async function searchStock() {
    const response = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setFilterStocks(response.data);
  }

  async function searchQuoteFromStock() {
    console.log('Buscar informacoes de cotacao para a açaõ');
  }

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilterStocks([]);
    } else {
      searchStock();
    }
  }, [debouncedSearch]);

  return (
    <Container>
      <Logo to="/">
        dashmoney
        <span>.</span>
      </Logo>
      <SearchBar
        value={search}
        setValue={setSearch}
        stocks={filterStocks}
        placeholder="Pesquise por ativos na plataforma"
        fetchData={searchQuoteFromStock}
      />
      <Portfolio to="/portfolio">
        <div>
          <strong>Meu Portfólio</strong>
          <span data-testid="cart-size">10 itens</span>
        </div>
        <BsCurrencyExchange size={36} color="#008FFB" />
      </Portfolio>
    </Container>
  );
}
