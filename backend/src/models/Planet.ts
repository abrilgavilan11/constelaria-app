import mongoose, { Schema, Document } from 'mongoose';

export interface IPlanet extends Document {
  name: string;
  type: string; // Luminar, Personal, Social, Transpersonal
  symbol: string;
  description: string;
}

const PlanetSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  symbol: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IPlanet>('Planet', PlanetSchema);
