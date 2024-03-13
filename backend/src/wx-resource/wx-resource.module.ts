import { Module } from '@nestjs/common';
import { WxResourceService } from './wx-resource.service';
import { WxResourceController } from './wx-resource.controller';

@Module({
  controllers: [WxResourceController],
  providers: [WxResourceService],
})
export class WxResourceModule {}
