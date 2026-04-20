import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  async create(
    createStoreDto: CreateStoreDto,
  ): Promise<{ status: number; message: string }> {
    await this.storesRepository.save(createStoreDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Store created successfully',
    };
  }

  findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storesRepository.findOneBy({ id });
    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
  ): Promise<{ status: number; message: string }> {
    const result = await this.storesRepository.update(id, updateStoreDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return {
      status: HttpStatus.OK,
      message: 'Store updated successfully',
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.storesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
  }
}
