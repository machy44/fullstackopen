import { Schema, model as mongooseModel, Document, Model } from 'mongoose';
import { IUser } from './user';

export interface IPerson extends Document {
  name: string;
  phone: string;
  street: string;
  city: string;
  friendOf: IUser[];
}

const schema = new Schema<IPerson>({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone: {
    type: String,
    minlength: 5,
  },
  street: {
    type: String,
    required: true,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
  friendOf: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export const Person: Model<IPerson> = mongooseModel('Person', schema);
