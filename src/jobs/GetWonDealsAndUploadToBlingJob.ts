import 'dotenv/config';
import * as schedule from 'node-schedule';
import { OpportunityModel } from '../entities/opportunity/model';
import {
  getDealsWithWonStatus,
  getProductsFromDealsWithWonStatus,
} from '../services/pipedrive/deals';
import { uploadToBling } from '../services/bling/order';

class GetWonDealsAndUploadToBlingJob {
  public static getWonDealsAndUploadToBling(): void {
    schedule.scheduleJob(`${process.env.JOB_TIME}`, async () => {
      try {
        console.log('getWonDealsAndUploadToBling job started!');
        const opportunities = await getDealsWithWonStatus();

        await Promise.all(
          opportunities.map(opportunity => {
            const {
              id,
              org_name,
              title,
              products_count,
              value,
              currency,
            } = opportunity;
            const query = { opportunityId: id };
            const update = {
              $setOnInsert: {
                opportunityId: id,
                clientName: org_name,
                serviceName: title,
                productCount: products_count,
                totalValueInBRL: value,
                currency,
                createdAt: new Date(),
              },
            };
            const options = { upsert: true };
            return OpportunityModel.findOneAndUpdate(query, update, options);
          }),
        );

        const wonDealsProductsArray = await getProductsFromDealsWithWonStatus(
          opportunities,
        );

        uploadToBling(wonDealsProductsArray);

        console.log(
          'Won deals inserted on Bling and on Database with success! Job ended successfuly.',
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
  }
}

export default GetWonDealsAndUploadToBlingJob;
