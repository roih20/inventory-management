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

export enum Status {
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  LOW_STOCK = 'LOW',
  MEDIUM_STOCK = 'MEDIUM',
  HIGH_STOCK = 'HIGH',
}

@Entity()
@Check(`"quantity" >= 0`)
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OUT_OF_STOCK,
  })
  status: Status;

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
      this.status = Status.OUT_OF_STOCK;
    } else if (this.quantity > 0 && this.quantity <= 15) {
      this.status = Status.LOW_STOCK;
    } else if (this.quantity > 15 && this.quantity <= 50) {
      this.status = Status.MEDIUM_STOCK;
    } else {
      this.status = Status.HIGH_STOCK;
    }
  }
}
