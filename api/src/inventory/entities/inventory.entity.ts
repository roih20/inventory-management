import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InventoryStatus } from 'src/enums/inventoryStatus.enum';
@Entity()
@Check(`"quantity" >= 0`)
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: InventoryStatus,
    default: InventoryStatus.OUT_OF_STOCK,
  })
  status: InventoryStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Store, (store) => store.inventory, {
    eager: true,
  })
  location: Store;

  @ManyToOne(() => Product, (product) => product.inventory, {
    eager: true,
  })
  product: Product;

  @BeforeInsert()
  @BeforeUpdate()
  updateStatus() {
    if (this.quantity === 0) {
      this.status = InventoryStatus.OUT_OF_STOCK;
    } else if (this.quantity > 0 && this.quantity <= 15) {
      this.status = InventoryStatus.LOW_STOCK;
    } else if (this.quantity > 15 && this.quantity <= 50) {
      this.status = InventoryStatus.MEDIUM_STOCK;
    } else {
      this.status = InventoryStatus.HIGH_STOCK;
    }
  }
}
