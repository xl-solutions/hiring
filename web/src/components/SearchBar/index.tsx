/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { SearchStocksProps } from '../Header';
import { IconSearch, Search } from './styles';

interface SearchBarProps {
  value?: string;
  setValue?: any;
  fetchData: (
    stock_name: string,
    stock_company?: string,
    stock_region?: string,
    stock_currency?: string
  ) => void;
  stocks?: SearchStocksProps[];
  setStocks?: any;
  placeholder: string;
}

export function SearchBar({
  value,
  setValue,
  setStocks,
  stocks,
  placeholder,
  fetchData,
}: SearchBarProps) {
  return (
    <Search>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={value?.toUpperCase()}
          onChange={(e) => setValue(e.target.value)}
        />
        <IconSearch as={RiSearchLine} />
      </div>
      {stocks?.length > 0 && (
        <div className="data-results">
          {stocks?.map((stock) => {
            return (
              <div
                className="item"
                key={stock.name}
                onClick={() => {
                  fetchData(
                    stock.name,
                    stock.company,
                    stock.region,
                    stock.currency
                  );
                  setStocks([]);
                }}
              >
                <p>{stock.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </Search>
  );
}
