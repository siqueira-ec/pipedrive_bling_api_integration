interface IDeal {
  id: number;
  title: string;
  value: number;
  currency: string;
  products_count: number;
  org_name: string;
}

interface IPipedriveDealsResponse {
  data: IDeal[];
  additional_data: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
    };
  };
}

interface IProduct {
  id: number;
  name: string;
  quantity: number;
  description: string;
  item_price: number;
  product_id: number;
}

interface IPipedriveProductsResponse {
  data: [
    {
      deal_id: number;
      quantity: number;
      product: IProduct;
      item_price: number;
      product_id: number;
    },
  ];
  additional_data: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
    };
  };
}

interface IDealWithProducts extends IDeal {
  deal_products: IProduct[];
}

export {
  IPipedriveDealsResponse,
  IPipedriveProductsResponse,
  IDealWithProducts,
  IDeal,
};
