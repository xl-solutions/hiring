import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Admin from '../components/Admin';
import { useAuth } from '../hooks/auth';
import * as constants from '../utils/constants';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleUpdateMenuSelecionado = (rota: string): void => {
    let menuSelecionado = null;
    switch (rota) {
      case '/historico':
        menuSelecionado = constants.MENU_HISTORICO;
        break;
      case '/stock':
        menuSelecionado = constants.MENU_STOCK;
        break;
      case '/comparacao':
        menuSelecionado = constants.MENU_COMPARACAO;
        break;
      case '/projecao':
        menuSelecionado = constants.MENU_PROJECAO;
      default:
        menuSelecionado = '';
    }
    dispatch({ type: 'HANDLE_MENU_CHANGE', active: menuSelecionado });
  };

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        handleUpdateMenuSelecionado(location.pathname);
        // eslint-disable-next-line no-nested-ternary
        return (
          <Admin>
            <Component />
          </Admin>
        )
      }}
    />
  );
};

export default Route;
