import React from 'react';
import {
  Route as ReactRoute,
  RouteComponentProps,
  RouteProps as ReactRouteProps,
} from 'react-router-dom';

import {
  FaTags,
  FaClock,
  FaSearch,
  FaChartLine,
  FaChartArea,
} from 'react-icons/fa';

import AppBar from 'components/Appbar';
import Sidebar from 'components/Sidebar';
import MenuItem from 'components/MenuItem';
import AppContainer from 'components/AppContainer';
import { useMenu } from 'context/menu/MenuContext';

interface RouteProps extends ReactRouteProps {
  component: React.FC<RouteComponentProps>;
}

const menus = [
  { id: 1, label: 'Pesquisar Cotações', path: '/', icon: FaSearch },
  { id: 2, label: 'Histórico de Ações', path: '/historico', icon: FaClock },
  { id: 3, label: 'Comparar Ações', path: '/comparar', icon: FaChartArea },
  { id: 4, label: 'Projeções', path: '/projecoes', icon: FaChartLine },
  { id: 5, label: 'Meu Portifólio', path: '/portifolio', icon: FaTags },
];

const Route: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { toggleMenu } = useMenu();
  return (
    <ReactRoute
      {...rest}
      render={(props) => (
        <>
          <AppBar />
          <AppContainer>
            <Sidebar>
              {menus.map(({ id, label, path, icon }) => (
                <MenuItem
                  key={id}
                  path={path}
                  icon={icon}
                  label={label}
                  onClick={toggleMenu}
                />
              ))}
            </Sidebar>
            <Component {...props} />
          </AppContainer>
        </>
      )}
    />
  );
};

export default Route;
