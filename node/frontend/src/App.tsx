import {
	BrowserRouter
} from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Header } from './components/Header';
import { Router } from './routes';
import GlobalStyle from './styles/global';

export function App() {
	return (
		<BrowserRouter>
			<Header />
			<Router />
			<GlobalStyle />
		</BrowserRouter>
	);
}