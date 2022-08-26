import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { addSalesOrder, listSalesOrders } from './business-layer';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const jsonParser = bodyParser.json()
app.use(jsonParser);

app.get('/sales-orders', (req: Request, res: Response<SalesOrdersResponse>) => {
  const orders = listSalesOrders();
  res.send({
    salesOrders: orders
  });
});

app.post('/sales-orders', (req: Request<SalesOrderCreateRequest>, res: Response<SalesOrder>) => {
  const order = addSalesOrder(req.body);
  res.send(order);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
