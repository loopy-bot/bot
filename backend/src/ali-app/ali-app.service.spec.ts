import { Test, TestingModule } from '@nestjs/testing';
import { AliAppService } from './ali-app.service';

describe('AliAppService', () => {
  let service: AliAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AliAppService],
    }).compile();

    service = module.get<AliAppService>(AliAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
