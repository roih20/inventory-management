import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { Product } from 'src/products/entities/product.entity';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';
import { SortOptions } from 'src/enums/sortOptions.enum';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createInventoryDto: CreateInventoryDto,
  ): Promise<{ status: number; message: string }> {
    const { quantity, productId, storeId } = createInventoryDto;

    const store = await this.storeRepository.findOneBy({ id: storeId });
    if (!store)
      throw new NotFoundException(`Store with ID ${storeId} not found`);

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product)
      throw new NotFoundException(`Product with ID ${productId} not found`);

    const inventory = this.inventoryRepository.create({
      quantity,
      location: store,
      product,
    });
    await this.inventoryRepository.save(inventory);
    return { status: HttpStatus.OK, message: 'Inventory created successfully' };
  }

  findAll(
    status?: InventoryStatus,
    sort?: SortOptions,
    order?: string,
  ): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: {
        status,
      },
      order: sort
        ? {
            [sort]: order,
          }
        : undefined,
    });
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOneBy({ id });
    if (!inventory)
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    return inventory;
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<{ status: number; message: string }> {
    const inventory = await this.findOne(id);
    Object.assign(inventory, updateInventoryDto);
    await this.inventoryRepository.save(inventory);
    return { status: HttpStatus.OK, message: 'Inventory updated successfully' };
  }

  async remove(id: number): Promise<{ status: number; message: string }> {
    const result = await this.inventoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }
    return { status: HttpStatus.OK, message: 'Inventory removed successfully' };
  }
}
