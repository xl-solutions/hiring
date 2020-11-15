import React from 'react';

interface MenuContextData {
  pageName: string;
  showMenu: boolean;
  toggleMenu: () => void;
  handleSetPageName: (page: string) => void;
}

const MenuContext = React.createContext({} as MenuContextData);

export const MenuProvider: React.FC = ({ children }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [pageName, setPageName] = React.useState('');

  const toggleMenu = React.useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const handleSetPageName = React.useCallback(
    (page: string) => setPageName(page),
    []
  );

  return (
    <MenuContext.Provider
      value={{ pageName, showMenu, toggleMenu, handleSetPageName }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export function useMenu(): MenuContextData {
  const context = React.useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be whitin its context');
  }

  return context;
}
