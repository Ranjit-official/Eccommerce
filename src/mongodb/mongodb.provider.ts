import * as mongoose from 'mongoose';
import { DBConfig } from 'src/common/config';

export const MongodbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connection = await mongoose.connect(DBConfig.url as string);
        console.log('Connected to MongoDB........................');
        return connection;
      } catch (exception) {
        console.log('Failed to connect to MongoDB........................');
        exception.message = 'Failed to connect to MongoDB';
        throw new mongoose.MongooseError(exception);
      }
    },
  },
];
