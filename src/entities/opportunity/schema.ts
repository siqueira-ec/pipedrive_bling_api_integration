import { Schema } from 'mongoose';

const OpportunitySchema = new Schema({
  opportunityId: { type: Number, required: true },
  name: { type: String, required: true },
  service: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitValue: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default OpportunitySchema;
