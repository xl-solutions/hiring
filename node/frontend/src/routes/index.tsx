import {
	Routes,
	Route
} from 'react-router-dom';

import { Home } from '../pages/Home';
import { History } from '../pages/History';
import { EarningsProjection } from '../pages/EarningsProjection';

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/history" element={<History />} />
			<Route path="/gains" element={<EarningsProjection />} />
		</Routes>
	);
}
