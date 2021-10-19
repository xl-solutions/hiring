/* eslint-disable no-undef */

import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStocks } from '../../hooks/stocks';
import { Container } from './styles';

const Menu: React.FC = () => {
  const { stockName } = useStocks();
  const className = 'hidden';

  useEffect(() => {
    const addOrRemoveClass = (): void => {
      const element = document.getElementById('nav-ol');
      const elementClass = element?.classList;
      if (elementClass) {
        window.innerWidth > 768
          ? elementClass.remove('hidden')
          : elementClass.add('hidden');
      }
    };

    window.onresize = addOrRemoveClass;
    window.onload = addOrRemoveClass;
  }, []);

  const addActiveClass = useCallback((): void => {
    const element = document.getElementById('nav-ol');
    const elementClass = element?.classList;
    if (elementClass) {
      if (elementClass.contains('hidden')) {
        elementClass.remove('hidden');
      } else {
        elementClass.add('hidden');
      }
    }
  }, []);

  return (
    <Container>
      <nav className="nav">
        <ol id="nav-ol" className={className}>
          <li>
            <Link to={`/dashboard/${stockName}/quote`}>Último Lançamento</Link>
          </li>
          <li>
            <Link to={`/dashboard/${stockName}/history`}>Histórico</Link>
          </li>
          <li>
            <Link to={`/dashboard/${stockName}/gains`}>Projetar Ganhos</Link>
          </li>
          <li>
            <Link to={`/dashboard/${stockName}/compare`}>
              Comparar com outras ações
            </Link>
          </li>

          <li className="animation" />
        </ol>
        <div className="flex-center-row">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={addActiveClass}
            onClick={addActiveClass}
            id="menu"
            className="menu"
          >
            <input type="checkbox" name="" id="" />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Menu;
