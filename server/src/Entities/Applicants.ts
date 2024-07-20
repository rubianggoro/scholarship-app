import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Applicants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  scholarship_id!: number;

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
