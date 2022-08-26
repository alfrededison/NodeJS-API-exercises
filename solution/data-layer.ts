const _DATABASE: Array<SalesOrder> = [];

export const listSalesOrders = () => {
  return _DATABASE;
}

export const addSalesOrder = (order: SalesOrder) => {
  return _DATABASE.push(order);
}

export const updateSalesOrder = (order: SalesOrder) => {
  const id = _DATABASE.findIndex((e) => e.id == order.id);
  _DATABASE[id] = order;
}
