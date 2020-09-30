import App from './App';
import OpportunityController from './controllers/OpportunityController';
import 'dotenv/config';

import validateEnv from './utils/validateEnv';

// validate env variables
validateEnv();

const app = new App([new OpportunityController()]);

app.listen();
