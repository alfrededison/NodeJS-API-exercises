const _DATABASE: Array<SalesOrder> = [];

export const listSalesOrders = (filters: SalesOrdersFilter) => {
  if (filters?.status) {
    return _DATABASE.filter((e) => e.status == filters.status);
  }
  return _DATABASE;
}

export const findSalesOrder = (id: SalesOrder['id']) => {
  return _DATABASE.find((e) => e.id == id);
}

export const addSalesOrder = (order: SalesOrder) => {
  return _DATABASE.push(order);
}

export const updateSalesOrder = (order: SalesOrder) => {
  const id = _DATABASE.findIndex((e) => e.id == order.id);
  _DATABASE[id] = order;
}
