import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { rootModules } from './modules';
import { globalConfig } from './app.config.global';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [globalConfig],
    }),
    ...rootModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
