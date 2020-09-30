import { create } from 'xmlbuilder';
import qs from 'qs';
import { IDealWithProducts } from '../types';
import api from './api';

const parseBlingOrderXML = (dealWithProductsObj: IDealWithProducts): string => {
  const blingProductXML = create('root');

  blingProductXML
    .ele('pedido')
    .ele('numero')
    .txt(dealWithProductsObj.id.toString())
    .up()
    .ele('cliente')
    .ele('nome')
    .txt(dealWithProductsObj.org_name)
    .up()
    .up()
    .ele('itens');

  dealWithProductsObj.deal_products.forEach(product => {
    blingProductXML
      .ele('item')
      .ele('descricao')
      .txt(product.description)
      .up()
      .ele('vlr_unit')
      .txt(product.item_price.toString())
      .up()
      .ele('qtde')
      .txt(product.quantity.toString())
      .up()
      .ele('codigo')
      .txt(product.id.toString());
  });

  return blingProductXML.toString();
};

export const uploadToBling = async (
  dealWithProductsObjArray: IDealWithProducts[],
): Promise<void> => {
  try {
    await Promise.all(
      dealWithProductsObjArray.map(async dealWithProductsObj => {
        const testeXML = parseBlingOrderXML(dealWithProductsObj);

        await api.post(
          '',
          qs.stringify({
            xml: testeXML,
            apikey: process.env.BLING_API_KEY,
          }),
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
          },
        );
      }),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
