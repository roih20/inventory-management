import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<{ status: number; message: string }> {
    await this.categoryRepository.save(createCategoryDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Category created successfully',
    };
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ status: number; message: string }> {
    const result = await this.categoryRepository.update(id, updateCategoryDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return {
      status: HttpStatus.OK,
      message: 'Category updated successfully',
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
