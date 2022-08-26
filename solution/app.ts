import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { addQuotes, addSalesOrder, bookCarrier, findSalesOrder, listSalesOrders } from './business-layer';
import { BadRequestException, NotFoundException } from './types/errors';

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

app.post('/sales-orders/:id/quotes', (req: Request<SalesOrderRequestParams, {}, QuotesCreateRequest>, res: Response<QuotesCreateResponse | { error: string }>) => {
  const order = findSalesOrder(req.params.id);
  addQuotes(order, req.body.carriers);
  res.send({
    quotes: order.quotes
  });
});

app.post('/sales-orders/:id/bookings', (req: Request<SalesOrderRequestParams, {}, BookingRequest>, res: Response<BookingResponse | { error: string }>) => {
  const order = findSalesOrder(req.params.id);
  bookCarrier(order, req.body.carrier);
  res.send({
    carrierBooked: order.carrierBooked as Carrier,
    carrierPricePaid: order.carrierPricePaid as number
  });
});

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  switch (true) {
    case err instanceof BadRequestException:
      res.status(400);
      break;
    case err instanceof NotFoundException:
      res.status(404);
      break;
    default:
      res.status(500);
  }
  res.send({ error: err.message })
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
