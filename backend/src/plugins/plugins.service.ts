import { Injectable } from '@nestjs/common';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';

@Injectable()
export class PluginsService {
  create(createPluginDto: CreatePluginDto) {
    return 'This action adds a new plugin';
  }

  findAll() {
    return `This action returns all plugins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plugin`;
  }

  update(id: number, updatePluginDto: UpdatePluginDto) {
    return `This action updates a #${id} plugin`;
  }

  remove(id: number) {
    return `This action removes a #${id} plugin`;
  }
}
