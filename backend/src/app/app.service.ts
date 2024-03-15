import { App } from './entities/app.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private readonly R: Repository<App>,
  ) {}

  async findAll(): Promise<App[]> {
    return this.R.find();
  }

  async findOne(id: string): Promise<App> {
    const res = await this.R.findOneBy({ id });
    return res;
  }

  async create(app: App): Promise<App> {
    return this.R.save(app);
  }

  async update(id: string, app: App): Promise<App> {
    const existingData = await this.findOne(id);
    if (!existingData) {
      throw new HttpException(`${id} not found`, 404);
    }
    await this.R.update(id, app);
    return this.R.findOneBy({ id });
  }

  async delete(id: string): Promise<boolean> {
    const existingData = await this.findOne(id);
    if (!existingData) {
      throw new HttpException(`${id} not found`, 404);
    }
    const res = await this.R.delete(id);
    return !!res;
  }
}
