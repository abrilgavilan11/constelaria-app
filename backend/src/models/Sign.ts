import mongoose, { Schema, Document } from 'mongoose';

export interface ISign extends Document {
  name: string;
  element: string; // Fuego, Tierra, Aire, Agua
  quality: string; // Cardinal, Fijo, Mutable
  ruler: string; // Planeta regente
  symbol: string; // Emoji o texto
  description: string;
}

const SignSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  element: { type: String, required: true },
  quality: { type: String, required: true },
  ruler: { type: String, required: true },
  symbol: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<ISign>('Sign', SignSchema);
