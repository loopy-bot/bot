import { Test, TestingModule } from '@nestjs/testing';
import { WxResourceService } from './wx-resource.service';

describe('WxResourceService', () => {
  let service: WxResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WxResourceService],
    }).compile();

    service = module.get<WxResourceService>(WxResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
