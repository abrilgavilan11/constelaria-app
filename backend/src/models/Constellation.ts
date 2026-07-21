import mongoose, { Schema, Document } from 'mongoose';

export interface IConstellation extends Document {
  name: string;
  description: string;
}

const ConstellationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IConstellation>('Constellation', ConstellationSchema);
