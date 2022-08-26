import {
  listSalesOrders as getFromDb,
  findSalesOrder as findFromDb,
  addSalesOrder as addToDb,
  updateSalesOrder
} from './data-layer';

export const listSalesOrders = (filters: SalesOrdersFilter) => {
  return getFromDb(filters);
}

export const findSalesOrder = (id: SalesOrder['id']) => {
  return findFromDb(id);
}

export const addSalesOrder = (order: SalesOrder) => {
  order.status = "RECEIVED";
  order.quotes = [];
  addToDb(order);
  return order;
}

export const addQuotes = (order: SalesOrder, carriers: Array<Carrier>) => {
  if (order.status == 'BOOKED') {
    throw new Error('Sales order is already booked');
  }
  const quotes = carriers.map((e) => ({
    carrier: e,
    priceCents: calculateCarrierFees(e, order.items)
  }))
  order.status = 'QUOTED';
  order.quotes = quotes;
  updateSalesOrder(order);
  return order;
}

export const bookCarrier = (order: SalesOrder, carrier: Carrier) => {
  const quote = order.quotes.find((e) => e.carrier == carrier);
  if (!quote) {
    throw new Error('A quote for the requested carrier booking is not available');
  }
  order.carrierBooked = carrier;
  order.carrierPricePaid = quote.priceCents;
  order.status = 'BOOKED';
  order.quotes = [];
  updateSalesOrder(order);
  return order;
}

const calculateCarrierFees = (carrier: Carrier, items: SalesOrder['items']): number => {
  switch (carrier) {
    case 'UPS':
      return items.reduce((acc, item) => acc + item.gramsPerItem * 0.05, 800);
    case 'USPS':
      return items.reduce((acc, item) => acc + item.gramsPerItem * 0.02, 1050);
    case 'FEDEX':
      return items.reduce((acc, item) => acc + item.gramsPerItem * 0.03, 1000);
    default:
      throw new Error(`Unknown carrier: ${carrier}`);
  }
};
