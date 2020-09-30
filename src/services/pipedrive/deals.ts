import api from './api';
import {
  IPipedriveDealsResponse,
  IPipedriveProductsResponse,
  IDealWithProducts,
  IDeal,
} from '../types';

const getDealsWithWonStatus = async (): Promise<IDeal[]> => {
  const { data: wonDeals }: IPipedriveDealsResponse = (
    await api.get('deals', {
      params: {
        status: 'won',
        start: 0,
      },
    })
  ).data;

  const wonDealsObjArray = wonDeals.map(deal => {
    const { id, org_name, title, products_count, value, currency } = deal;

    return {
      id,
      org_name,
      title,
      products_count,
      value,
      currency,
    };
  });

  return wonDealsObjArray;
};

const getProductsFromDealsWithWonStatus = async (
  opportunitiesArray: IDeal[],
): Promise<IDealWithProducts[]> => {
  const wonDealsProductsArray = await Promise.all(
    opportunitiesArray.map(async opportunity => {
      const { data: wonDealProductsNested }: IPipedriveProductsResponse = (
        await api.get(`deals/${opportunity.id}/products`, {
          params: {
            start: 0,
            include_product_data: 1,
          },
        })
      ).data;

      const wonDealProducts = wonDealProductsNested.map(
        ({
          quantity,
          item_price,
          product_id,
          product: { id, name, description },
        }) => {
          return { id, name, description, quantity, item_price, product_id };
        },
      );

      const serializedDealProducts = {
        ...opportunity,
        deal_products: wonDealProducts,
      };

      return serializedDealProducts;
    }),
  );

  return wonDealsProductsArray;
};

export { getDealsWithWonStatus, getProductsFromDealsWithWonStatus };
