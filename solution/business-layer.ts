import {
  listSalesOrders as getFromDb,
  addSalesOrder as addToDb
} from './data-layer';

export const listSalesOrders = () => {
  return getFromDb();
}

export const addSalesOrder = (order: SalesOrder) => {
  order.status = "RECEIVED";
  order.quotes = [];
  addToDb(order);
  return order;
}
