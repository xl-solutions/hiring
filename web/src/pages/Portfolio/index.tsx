import { MdDelete } from 'react-icons/md';
import { Header } from '../../components/Header';
import { Container, ProductTable } from './styles';

export default function Portfolio() {
  return (
    <>
      <Header />
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>EMPRESA</th>
              <th>PREÇO</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            <tr data-testid="stock">
              <td>
                <strong>AAPL</strong>
              </td>
              <td>
                <strong>Apple Inc</strong>
              </td>
              <td>
                <strong>R$ 150.00</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-stock"
                  onClick={() => console.log('DELETAR ATIVO DO PORTFOLIO')}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
            <tr data-testid="stock">
              <td>
                <strong>AAPL</strong>
              </td>
              <td>
                <strong>Apple Inc</strong>
              </td>
              <td>
                <strong>R$ 150.00</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-stock"
                  onClick={() => console.log('DELETAR ATIVO DO PORTFOLIO')}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
            <tr data-testid="stock">
              <td>
                <strong>AAPL</strong>
              </td>
              <td>
                <strong>Apple Inc</strong>
              </td>
              <td>
                <strong>R$ 150.00</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-stock"
                  onClick={() => console.log('DELETAR ATIVO DO PORTFOLIO')}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        </ProductTable>
      </Container>
    </>
  );
}
