import {
	BrowserRouter
} from 'react-router-dom';
import { Header } from './components/Header';
import GlobalStyle from './styles/global';

export function App() {
	return (
		<BrowserRouter>
			<Header />
			<GlobalStyle />
		</BrowserRouter>
	);
}


