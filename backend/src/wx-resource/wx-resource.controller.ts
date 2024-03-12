import { Controller } from '@nestjs/common';
import { WxResourceService } from './wx-resource.service';

@Controller('wx-resource')
export class WxResourceController {
  constructor(private readonly wxResourceService: WxResourceService) {}
}
