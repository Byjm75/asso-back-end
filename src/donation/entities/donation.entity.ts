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
  // Colonne de l'Id crée et transformé en string
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Colonne montant obligatoire
  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;

  // Colonne par mois par défaut
  @Column({
    nullable: false,
    default: true,
  })
  by_month: boolean;

  // Colonne date de création, se créer automatiquement
  @CreateDateColumn()
  created_at: Date;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Relation avec la table projet
  @ManyToOne(() => Project, (projects) => projects.donations, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: false,
  })
  project_: Project;

  //Relation avec la table donateur
  @ManyToOne(() => Donor, (donors) => donors.donations, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  donor_: Donor;
}
