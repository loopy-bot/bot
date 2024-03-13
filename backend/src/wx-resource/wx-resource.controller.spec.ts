import { Test, TestingModule } from '@nestjs/testing';
import { WxResourceController } from './wx-resource.controller';
import { WxResourceService } from './wx-resource.service';

describe('WxResourceController', () => {
  let controller: WxResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WxResourceController],
      providers: [WxResourceService],
    }).compile();

    controller = module.get<WxResourceController>(WxResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
