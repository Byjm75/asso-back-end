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
  // Colonne de l'Id crée et transformé en string
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Colonne topic obligatoire
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  topic: string;

  // Colonne body obligatoire
  @Column({
    nullable: false,
  })
  body: string;

  // Colonne website non obligatoire
  @Column({
    nullable: true,
  })
  website: string;

  // Colonne favoris
  @Column({
    nullable: true,
  })
  favoris: string;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Relation avec la table association
  @ManyToOne(() => Association, (associations) => associations.projects, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: false,
  })
  association_: Association;

  //Relation avec la table donnation
  @OneToMany(() => Donation, (donations) => donations.project_, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donations: Donation[];
}
