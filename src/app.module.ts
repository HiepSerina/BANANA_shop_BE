import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from "./config";
import {UserModule} from "./module/user/user.module";
import {ItemModule} from "./module/item/item.module";
import {AuthModule} from "./module/auth/auth.module";
import {CartModule} from "./module/cart/cart.module";

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get<string>('database.uri'),
      };
    },
    inject: [ConfigService],
  }),
    ConfigModule.forRoot({
      load: config,
    }),
      UserModule,
      ItemModule,
      AuthModule,
      CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
