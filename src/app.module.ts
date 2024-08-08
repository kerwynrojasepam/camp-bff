import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { rootModules } from './modules';

@Module({
  imports: rootModules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
