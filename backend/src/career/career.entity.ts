import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CareerRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  education: string;

  @Column()
  skills: string;

  @Column()
  interests: string;

  @Column({ nullable: true })
  recommendation: string;
}