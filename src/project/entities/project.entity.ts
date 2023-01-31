import { Association } from 'src/association/entities/association.entity';
import { DonationService } from 'src/donation/donation.service';
import { Donation } from 'src/donation/entities/donation.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  //Je génére la clé primaire
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  topic: string;

  @Column({
    nullable: false,
  })
  body: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Méthode du "ondelete" en Cascade permet de supprimer les tables associées.
  @ManyToOne(() => Association, (associations) => associations.projects, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  association_: Association;

  @OneToMany(() => Donation, (donations) => donations.project_, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donations: Donation[];
}
