import {
	Routes,
	Route
} from 'react-router-dom';

import { Home } from '../pages/Home';

import { RecentQuote } from '../pages/RecentQuote';

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/quote" element={<RecentQuote />} />
		</Routes>
	);
}
