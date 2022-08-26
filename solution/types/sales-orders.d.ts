type SalesOrder = {
  id: string,
  status: Status,
  customer: string,
  items: Array<{
    sku: string,
    quantity: number,
    gramsPerItem: number,
    price: number
  }>
  carrierPricePaid?: number;
  carrierBooked?: Carrier;
  quotes: Array<{
    carrier: Carrier,
    priceCents: number
  }>
}

type Status = 'RECEIVED' | 'QUOTED' | 'BOOKED' | 'CANCELLED';
type Carrier = 'UPS' | 'FEDEX' | 'USPS';

type SalesOrdersResponse = {
  salesOrders: Array<SalesOrder>
}

type SalesOrderCreateRequest = Pick<SalesOrder, 'id' | 'customer' | 'items'>
