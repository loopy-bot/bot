import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
