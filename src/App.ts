import express, { Application } from 'express';
import { json } from 'body-parser';
import { connect, disconnect, Connection, connection } from 'mongoose';
import IController from './controllers/types';
import GetWonDealsAndUploadToBlingJob from './jobs/GetWonDealsAndUploadToBlingJob';

class App {
  public app: Application;

  public database: Connection | undefined;

  constructor(controllers: IController[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
  }

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  public listen(): void {
    GetWonDealsAndUploadToBlingJob.getWonDealsAndUploadToBling();

    const { PORT } = process.env;

    this.app.listen(PORT, () => {
      console.log(`App listening on the port ${PORT}`);
    });
  }

  private connectToDatabase(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DB } = process.env;
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}/${MONGO_DB}?retryWrites=true&w=majority`;

    if (this.database) {
      return;
    }

    connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.database = connection;

    this.database.once('open', async () => {
      console.log('Connected to database');
    });

    this.database.on('error', () => {
      console.log('Error connecting to database');
    });
  }

  private disconnectDatabase(): void {
    if (!this.database) {
      return;
    }

    disconnect();
  }
}

export default App;
