import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { addQuotes, addSalesOrder, findSalesOrder, listSalesOrders } from './business-layer';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const jsonParser = bodyParser.json()
app.use(jsonParser);

app.get('/sales-orders', (req: Request<SalesOrdersFilter>, res: Response<SalesOrdersResponse>) => {
  const orders = listSalesOrders(req.query);
  res.send({
    salesOrders: orders
  });
});

app.post('/sales-orders', (req: Request<SalesOrderCreateRequest>, res: Response<SalesOrder>) => {
  const order = addSalesOrder(req.body);
  res.send(order);
});

app.post('/sales-orders/:id/quotes', (req: Request<QuotesCreateParams, {}, QuotesCreateRequest>, res: Response<QuotesCreateResponse|{error: string}>) => {
  const order = findSalesOrder(req.params.id);
  if (order) {
    addQuotes(order, req.body.carriers);
    res.send({
      quotes: order.quotes
    });
  } else {
    res.status(404).send({
      error: 'Sales order not found'
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
