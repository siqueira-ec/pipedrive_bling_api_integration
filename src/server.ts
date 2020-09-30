import App from './App';
import OpportunityController from './controllers/opportunity/controller';
import 'dotenv/config';

import validateEnv from './utils/validateEnv';

// validate env variables
validateEnv();

const app = new App([new OpportunityController()]);

app.listen();
