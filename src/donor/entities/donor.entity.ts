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
  //Je génére la clé primaire
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //Je crée les colonnes
  @Column({
    nullable: false,
  })
  pseudo: string; //Je nomme le nom de la colonne et la type

  @Column({
    nullable: false,
  })
  surname: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  email: string;
  //TypeOrm est typé par default en varchar 255 si autre le préciser

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.DONOR,
  })
  role: RoleEnumType;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Méthode du "ondelete en Cascade permet de supprimer les tables associées"
  @ManyToMany(() => Association, { eager: false })
  @JoinTable()
  association: Association[];

  @OneToMany(() => Donation, (donations) => donations.donor_, {
    onDelete: 'CASCADE',
  })
  donations: Donation[];
}
