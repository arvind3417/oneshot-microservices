import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'your-mongo-uri',
      // Other options...
    };
  }
}
