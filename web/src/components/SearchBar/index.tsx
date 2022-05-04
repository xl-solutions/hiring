/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiSearchLine } from 'react-icons/ri';
import { SearchStocksProps } from '../Header';
import { IconSearch, Search } from './styles';

interface SearchBarProps {
  setValue?: any;
  stocks: SearchStocksProps[];
}

export function SearchBar({ setValue, stocks }: SearchBarProps) {
  return (
    <Search>
      <div>
        <input
          type="text"
          placeholder="Pesquise por ativos na plataforma"
          onChange={(e) => setValue(e.target.value)}
        />
        <IconSearch as={RiSearchLine} />
      </div>
      {stocks.length > 0 && (
        <div className="data-results">
          {stocks.map((stock) => {
            return (
              <div className="item" key={stock.name}>
                <p>{stock.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </Search>
  );
}
