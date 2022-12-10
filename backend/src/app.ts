import * as express from 'express';
import * as cors from 'cors';
import requestLogger from './middleware/requestLogger';
import unknownEndpoint from './middleware/unknownEndpoint';
import infractionRouter from './routers/infractionRouter';
import pilotRouter from './routers/pilotRouter';

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.use('/infractions', infractionRouter());
app.use('/pilots', pilotRouter());

app.use(unknownEndpoint);

export default app;
