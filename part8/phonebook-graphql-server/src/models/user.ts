import { Schema, model as mongooseModel, Document, Model } from 'mongoose';
import type { IPerson } from './person';

export interface IUser extends Document {
  username: string;
  friends: IPerson[];
}

const schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
});

export const User = mongooseModel('User', schema);

// module.exports = mongooseModel('User', schema);
