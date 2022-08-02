import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const mongooseConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleFactoryOptions> => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configServce: ConfigService): string => {
  return `mongodb+srv://${configServce.get('MONGO_LOGIN')}:${configServce.get(
    'MONGO_PASSWORD',
  )}@cluster0.modi7.mongodb.net/${configServce.get(
    'MONGO_DATABASE',
  )}?retryWrites=true&w=majority`;
};
