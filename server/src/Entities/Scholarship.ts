import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Scholarship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: Users;

  @Column()
  name!: string;

  @Column()
  level_student!: string;

  @Column("text")
  short_description!: string;

  @Column("text")
  detailed_description!: string;

  @Column()
  banner_image!: string;

  @Column("json")
  document_upload!: string[];

  @Column()
  deadline!: Date;
}
