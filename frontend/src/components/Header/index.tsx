import React, { useCallback } from 'react';
import { FiDollarSign, FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

interface Props {
  isHome?: boolean;
}

const Header: React.FC<Props> = ({ isHome = false }) => {
  const history = useHistory();

  const handleBackHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <header>
        <div>
          <FiDollarSign />
          <h1>Finances</h1>
        </div>

        {!isHome && (
          <FiArrowLeft className="back-button" onClick={handleBackHome} />
        )}
      </header>
    </Container>
  );
};

export default Header;
