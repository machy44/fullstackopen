import { Person } from '../models/person';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { User } from '../models/user';
import { MONGODB_URI } from '../utils/config';
import { info, error as errorLogger } from '../utils/logger';

const seed = async () => {
  try {
    mongoose
      .connect(String(MONGODB_URI))
      .then(() => {
        info('connected to MongoDB');
      })
      .catch((error) => {
        errorLogger('error connecting to MongoDB:', error.message);
      });

    await Person.deleteMany({});
    await User.deleteMany({});

    const user = await new User({ username: 'machy' }).save();

    await Promise.all(
      [...Array(6)].map(async (x) => {
        const person = new Person({
          name: faker.name.fullName(),
          phone: faker.phone.number(),
          street: faker.address.streetName(),
          city: faker.address.cityName(),
          friendOf: user._id,
        });
        await person.save();
        user.friends = user.friends.concat(person);
      }),
    );

    await user.save();
    mongoose.disconnect();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
      throw new Error(e.message);
    }
    mongoose.disconnect();
  }
};

seed();
