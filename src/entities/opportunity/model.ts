import { model } from 'mongoose';
import { IOpportunityDocument, IOpportunityModel } from './types';
import OpportunitySchema from './schema';

export const OpportunityModel: IOpportunityModel = model<IOpportunityDocument>(
  'opportunity',
  OpportunitySchema,
);
