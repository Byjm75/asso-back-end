import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
  })
  amount: Number;

  @Column({
    nullable: false,
  })
  by_month: Boolean;

  @Column({
    nullable: false,
  })
  created_at: Date;

  @ManyToOne(() => Project, (projects) => projects.donations, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  project_: Project;

  @ManyToOne(() => Donor, (donors) => donors.donations, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donor_: Donor;
}
