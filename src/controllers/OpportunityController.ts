import { Router, Request, Response } from 'express';
import {
  getDealsWithWonStatus,
  getProductsFromDealsWithWonStatus,
} from '../services/pipedrive/deals';
import { OpportunityModel } from '../entities/opportunity/model';
import { uploadToBling } from '../services/bling/order';

class OpportunityController {
  public path = '/opportunity';

  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.post(this.path, this.saveWonOpportunities);
    this.router.get(`${this.path}`, this.getOpportunitiesAggregatedPerDate);
  }

  saveWonOpportunities = async (
    _request: Request,
    response: Response,
  ): Promise<void> => {
    try {
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
              totalValue: value,
              currency,
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

      response.status(200).json(opportunities);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  getOpportunitiesAggregatedPerDate = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    try {
      const aggregatedOpportunities = await OpportunityModel.aggregate([
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: '%d-%m-%Y', date: '$createdAt' },
              },
              currency: '$currency',
            },
            count: { $sum: 1 },
            value: { $sum: '$totalValue' },
          },
        },
      ]);

      response.status(200).json(aggregatedOpportunities);
    } catch (error) {
      response.status(500).send(error);
    }
  };
}

export default OpportunityController;
