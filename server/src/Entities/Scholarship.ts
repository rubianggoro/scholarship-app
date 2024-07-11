import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Scholarship extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

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
}
