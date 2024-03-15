import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { App } from './entities/app.entity';
import { logMethodName } from '../common/decorators/logMethodName';
import { AppService } from './app.service';

@Controller('api/applications')
export class AppController {
  constructor(private readonly appServer: AppService) {}

  @Get()
  @logMethodName
  async findAll(): Promise<App[]> {
    return this.appServer.findAll();
  }

  @Get(':id')
  @logMethodName
  async findOne(@Param('id') id: string): Promise<App> {
    return this.appServer.findOne(id);
  }

  @Post()
  @logMethodName
  async create(@Body() App: App): Promise<App> {
    return this.appServer.create(App);
  }

  @Put(':id')
  @logMethodName
  async update(@Param('id') id: string, @Body() App: App): Promise<App> {
    return this.appServer.update(id, App);
  }

  @Delete(':id')
  @logMethodName
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.appServer.delete(id);
  }
}
