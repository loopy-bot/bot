import { Module } from '@nestjs/common';
import { AliAppService } from './ali-app.service';
import { AliAppController } from './ali-app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AliApp } from './entities/ali-app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AliApp])],
  controllers: [AliAppController],
  providers: [AliAppService],
})
export class AliAppModule {}
