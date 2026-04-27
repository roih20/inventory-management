import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ILike, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { Product } from 'src/products/entities/product.entity';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';
import { SortOptions } from 'src/enums/sortOptions.enum';
import { OrderOptions } from 'src/enums/orderOptions.enum';
import { PaginatedResult } from 'src/interfaces/pagination.interface';

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
    return {
      status: HttpStatus.CREATED,
      message: 'Inventory created successfully',
    };
  }

  /*
  findAll(
    status?: InventoryStatus[],
    location?: string[],
    sort?: SortOptions,
    order?: OrderOptions,
  ): Promise<Inventory[]> {
    return this.inventoryRepository.find({
      where: {
        status: status ? In(status) : undefined,
        location: {
          zipCode: location ? In(location) : undefined,
        },
      },
      order: sort
        ? {
            [sort]: order,
          }
        : undefined,
    });
  }
  */

  /*
  async findAllPaginated(
    size?: number,
    cursor?: number,
    status?: InventoryStatus[],
  ): Promise<PaginatedResult<Inventory>> {
    const inventory = await this.inventoryRepository.find({
      where: {
        id: MoreThanOrEqual(cursor || 1),
        status: status ? In(status) : undefined,
      },
      take: (size || 5) + 1,
      order: {
        id: 'ASC',
      },
    });

    const hasNextPage = inventory.length > (size || 5);
    const data = hasNextPage ? inventory.slice(0, size || 5) : inventory;
    const nextCursor = hasNextPage ? inventory[inventory.length - 1].id : null;
    return { data, nextCursor };
  }
`*/

  searchInventory(query: string): Promise<Inventory[]> {
    return this.inventoryRepository.findBy({
      product: {
        name: ILike(`%${query}%`),
      },
    });
  }

  async findAllPaginated(
    limit: number,
    offset: number,
    status?: InventoryStatus[],
  ): Promise<PaginatedResult<Inventory>> {
    const [inventory, totalElements] =
      await this.inventoryRepository.findAndCount({
        where: { status: status?.length ? In(status) : undefined },
        order: { id: 'ASC' },
        take: limit,
        skip: offset,
      });

    return {
      data: inventory,
      numberOfElements: inventory.length,
      totalElements,
      hasNextPage: offset + inventory.length < totalElements,
      hasPreviousPage: offset > 0,
    };
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
