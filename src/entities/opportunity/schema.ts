import { Schema } from 'mongoose';

const OpportunitySchema = new Schema({
  opportunityId: { type: Number, required: true },
  clientName: { type: String, required: true },
  serviceName: { type: String, required: true },
  productCount: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default OpportunitySchema;
