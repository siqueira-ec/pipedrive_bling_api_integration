import { Document, Model } from 'mongoose';

export interface IOpportunity {
  opportunityId: number;
  clientName: string;
  serviceName: string;
  productCount: number;
  totalValue: number;
  currency: string;
}

export interface IOpportunityDocument extends IOpportunity, Document {}
export type IOpportunityModel = Model<IOpportunityDocument>;
