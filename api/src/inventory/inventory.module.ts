import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Store, Product])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
