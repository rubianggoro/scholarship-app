import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Scholarship } from "./Scholarship";

@Entity()
export class Applicants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  scholarship_id!: number;

  @ManyToOne(() => Scholarship, (scholar) => scholar.id)
  @JoinColumn({ name: "scholarship_id" })
  scholarship!: Scholarship;

  @Column()
  name!: string;

  @Column()
  last_education!: string;

  @Column("text")
  short_self_desc!: string;

  @Column()
  document_upload!: string;

  @Column()
  status!: number;

  @CreateDateColumn()
  createdAt: Date = new Date();
}
