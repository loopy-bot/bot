import { AliApp } from './entities/ali-app.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AliAppService {
  constructor(
    @InjectRepository(AliApp)
    private readonly R: Repository<AliApp>,
  ) {}

  async findAll(): Promise<AliApp[]> {
    return this.R.find();
  }

  async findOne(id: string): Promise<AliApp> {
    const res = await this.R.findOneBy({ id });
    return res;
  }

  async create(app: AliApp): Promise<AliApp> {
    return this.R.save(app);
  }

  async update(id: string, app: AliApp): Promise<AliApp> {
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
