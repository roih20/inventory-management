import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

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
}
