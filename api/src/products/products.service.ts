import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsService: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryService: Repository<Category>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ status: number; message: string }> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoryService.findOneBy({ id: categoryId });
    if (!category)
      throw new NotFoundException(`Category with id ${categoryId} not found`);

    const product = this.productsService.create({
      ...productData,
      category,
    });

    await this.productsService.save(product);

    return {
      status: HttpStatus.CREATED,
      message: 'Product created successfully',
    };
  }

  findAll(): Promise<Product[]> {
    return this.productsService.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsService.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<{ status: number; message: string }> {
    const result = await this.productsService.update(id, updateProductDto);

    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      status: HttpStatus.OK,
      message: 'Product updated successfully',
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsService.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
