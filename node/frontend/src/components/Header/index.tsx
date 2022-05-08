import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

export function Header() {
	return (
		<Container>
			<Content>
				<h1>Corretora ipnet</h1>
				<Link to="/">Cotação recente</Link>
				<Link to="/">Histórico entre datas</Link>
				<Link to="/">Comparar cotações</Link>
				<Link to="/">Projeção de ganhos</Link>
			</Content>
		</Container>
	);
}
