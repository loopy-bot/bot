import { Body, Controller, Post } from '@nestjs/common';
import { WxResourceService } from './wx-resource.service';
import { Room } from './entities/room.entity';
import { Friend } from './entities/friend.entity';

@Controller('resource')
export class WxResourceController {
  constructor(private readonly wxResourceService: WxResourceService) {}

  @Post('upload')
  upload(@Body() body: { rooms: Room; friends: Friend }) {
    console.log(body);
  }
}
