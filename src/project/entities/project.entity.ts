import { Association } from 'src/association/entities/association.entity';
import { Donation } from 'src/donation/entities/donation.entity';
import {
  Column,
  Entity,
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
  url: string;

  @Column({
    nullable: true,
  })
  picture: string;
  @Column({
    nullable: true,
    default: false,
  })
  favoris: boolean;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Méthode du "ondelete" en Cascade permet de supprimer les tables associées.
  @ManyToOne(() => Association, (associations) => associations.projects, {
    onDelete: 'CASCADE',
    nullable: false,
    // eager: true,
  })
  association_: Association;

  @OneToMany(() => Donation, (donations) => donations.project_, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donations: Donation[];
}
