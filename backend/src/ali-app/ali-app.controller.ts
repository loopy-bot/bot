import { AliAppService } from './ali-app.service';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AliApp } from './entities/ali-app.entity';
import { logMethodName } from '../decorators/logMethodName';

@Controller('api/applications')
export class AliAppController {
  constructor(private readonly aliAppService: AliAppService) {}

  @Get()
  @logMethodName
  async findAll(): Promise<AliApp[]> {
    return this.aliAppService.findAll();
  }

  @Get(':id')
  @logMethodName
  async findOne(@Param('id') id: string): Promise<AliApp> {
    return this.aliAppService.findOne(id);
  }

  @Post()
  @logMethodName
  async create(@Body() aliApp: AliApp): Promise<AliApp> {
    return this.aliAppService.create(aliApp);
  }

  @Put(':id')
  @logMethodName
  async update(@Param('id') id: string, @Body() aliApp: AliApp): Promise<AliApp> {
    return this.aliAppService.update(id, aliApp);
  }

  @Delete(':id')
  @logMethodName
  async delete(@Param('id') id: string): Promise<void> {
    return this.aliAppService.delete(id);
  }
}
