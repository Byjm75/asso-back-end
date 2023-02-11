import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;

  @Column({
    nullable: false,
    default: true,
  })
  by_month: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Project, (projects) => projects.donations, {
    onDelete: 'CASCADE',
    nullable: false,
    // eager: true,
  })
  project_: Project;

  @ManyToOne(() => Donor, (donors) => donors.donations, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donor_: Donor;
}
