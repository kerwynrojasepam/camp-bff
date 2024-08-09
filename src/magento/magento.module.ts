import { Module } from '@nestjs/common';
import { MagentoService } from './magento.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils';

@Module({
  imports: [HttpModule, UtilsModule],
  providers: [MagentoService],
  exports: [MagentoService],
})
export class MagentoModule {}
