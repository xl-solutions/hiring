import { BsCurrencyExchange } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Logo, Portfolio } from './styles';
import { useDebounce } from '../../hooks/useDebounce';
import api from '../../services/api';
import { SearchBar } from '../SearchBar';
import { IState } from '../../store';

interface HeaderProps {
  fetchData?: (
    stock_name: string,
    stock_company?: string,
    stock_region?: string,
    stock_currency?: string
  ) => void;
  withSearchBar?: boolean;
}

export interface SearchStocksProps {
  name: string;
  company: string;
  region: string;
  currency: string;
}

export function Header({ fetchData, withSearchBar }: HeaderProps) {
  const portfolioSize = useSelector<IState, number>(
    (state) => state.portfolio.items.length
  );
  const [search, setSearch] = useState('');
  const [filterStocks, setFilterStocks] = useState<SearchStocksProps[]>([]);

  const debouncedSearch = useDebounce(search, 500);

  async function searchStock() {
    const response = await api.get('/search', {
      params: { symbol: debouncedSearch },
    });

    setFilterStocks(response.data);
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
      {withSearchBar && (
        <SearchBar
          value={search}
          setValue={setSearch}
          setStocks={setFilterStocks}
          stocks={filterStocks}
          placeholder="Pesquise por ativos na plataforma"
          fetchData={fetchData}
        />
      )}
      <Portfolio to="/portfolio">
        <div>
          <strong>Meu Portfólio</strong>
          <span data-testid="portfolio-size">
            {portfolioSize === 1
              ? `${portfolioSize} item`
              : `${portfolioSize} itens`}
          </span>
        </div>
        <BsCurrencyExchange size={36} color="#008FFB" />
      </Portfolio>
    </Container>
  );
}
