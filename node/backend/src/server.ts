import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
});

app.listen(process.env.PORT || 3333, () => {
	console.log('listening on port 3333');
});
