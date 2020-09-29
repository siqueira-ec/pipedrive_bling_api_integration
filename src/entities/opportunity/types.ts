import { Document, Model } from 'mongoose';

export interface IOpportunity {
  opportunityId: number;
  name: string;
  service: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  description: string;
  createdAt: Date;
}

export interface IOpportunityDocument extends IOpportunity, Document {}
export type IOpportunityModel = Model<IOpportunityDocument>;
