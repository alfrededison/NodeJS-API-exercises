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
  quotes: Array<ShippingQuote>
};

type Status = 'RECEIVED' | 'QUOTED' | 'BOOKED' | 'CANCELLED';
type Carrier = 'UPS' | 'FEDEX' | 'USPS';

type ShippingQuote = {
  carrier: Carrier;
  priceCents: number;
};

type SalesOrdersFilter = Partial<Pick<SalesOrder, 'status'>>;
type SalesOrdersResponse = {
  salesOrders: Array<SalesOrder>
};

type SalesOrderCreateRequest = Pick<SalesOrder, 'id' | 'customer' | 'items'>;

type SalesOrderRequestParams = Pick<SalesOrder, 'id'>;

type QuotesCreateRequest = {
  carriers: Array<Carrier>
}
type QuotesCreateResponse = Pick<SalesOrder, 'quotes'>

type BookingRequest = Pick<ShippingQuote, 'carrier'>
type BookingResponse = Required<Pick<SalesOrder, 'carrierBooked' | 'carrierPricePaid'>>
