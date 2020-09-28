import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) =>
  res.json({
    message: 'Hello, world!',
  }),
);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.BASE_URL || 'localhost'}:${port}`,
  );
});
