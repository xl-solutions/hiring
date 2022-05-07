import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
});

app.listen(3000, () => console.log('listening on port 3000'));
