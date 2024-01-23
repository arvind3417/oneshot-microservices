import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfigService } from './services/config/mongo-config.service';
import { TaskController } from './task.controller';
import { BlogService } from './services/task.service';
import { BlogSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'Blog',
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [BlogService],
})
export class TaskModule {}
