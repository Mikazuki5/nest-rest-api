import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthMinddleware } from './user/middleware/auth.middleware';

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.mongoURI),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMinddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
