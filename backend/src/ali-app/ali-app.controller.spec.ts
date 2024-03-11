import { Test, TestingModule } from '@nestjs/testing';
import { AliAppController } from './ali-app.controller';
import { AliAppService } from './ali-app.service';

describe('AliAppController', () => {
  let controller: AliAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AliAppController],
      providers: [AliAppService],
    }).compile();

    controller = module.get<AliAppController>(AliAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
