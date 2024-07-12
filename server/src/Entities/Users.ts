import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scholarship } from "./Scholarship";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  isStudent!: boolean;

  @OneToMany(() => Scholarship, (scholar) => scholar.user)
  scholarship!: Scholarship[];
}
