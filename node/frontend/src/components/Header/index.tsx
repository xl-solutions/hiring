import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

export function Header() {
	return (
		<Container>
			<Content>
				<Link to="/">
					<h1>Corretora ipnet</h1>
				</Link>
				<Link to="/">Home</Link>
				<Link to="/history">Histórico entre datas</Link>
				<Link to="/">Comparar cotações</Link>
				<Link to="/">Projeção de ganhos</Link>
			</Content>
		</Container>
	);
}
