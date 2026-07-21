import mongoose, { Schema, Document } from 'mongoose';

export interface IHouse extends Document {
  number: number;
  name: string;
  description: string;
}

const HouseSchema: Schema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IHouse>('House', HouseSchema);
