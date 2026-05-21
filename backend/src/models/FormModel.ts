import mongoose, { Document, Schema } from 'mongoose';

interface IFormData extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const FormSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFormData>('FormData', FormSchema);