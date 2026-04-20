import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 10 })
  zipCode: string;
}
