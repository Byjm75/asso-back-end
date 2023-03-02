import { Association } from 'src/association/entities/association.entity';
import { RoleEnumType } from 'src/auth/roles.decorator';
import { Donation } from 'src/donation/entities/donation.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Donor {
  // Colonne de l'Id crée et transformé en string
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Colonne pseudo obligatoire et pseudo unique
  @Column({
    nullable: false,
    unique: true,
  })
  //Je nomme le nom de la colonne et la type
  pseudo: string;

  // Colonne pseudo obligatoire et pseudo unique
  @Column({
    nullable: false,
    unique: true,
  })
  surname: string;

  // Colonne pseudo obligatoire et pseudo unique
  @Column({
    nullable: false,
    unique: true,
  })
  firstname: string;

  // Colonne email obligatoire
  @Column({
    nullable: false,
  })
  email: string;

  // Colonne mot de passe obligatoire
  @Column({
    nullable: false,
  })
  password: string;

  // Colonne role généré automatiquement
  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.DONOR,
  })
  role: RoleEnumType;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Relation avec la table Association
  @ManyToMany(() => Association, { eager: false })
  @JoinTable()
  association: Association[];

  //Relation avec la table Donation
  @OneToMany(() => Donation, (donations) => donations.donor_, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: false,
  })
  donations: Donation[];
}
