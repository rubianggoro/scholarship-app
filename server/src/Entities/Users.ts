import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scholarship } from "./Scholarship";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 50 })
  password!: string;

  @Column()
  isStudent!: boolean;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @OneToMany(() => Scholarship, (scholar) => scholar.user)
  scholarship!: Scholarship[];
}
