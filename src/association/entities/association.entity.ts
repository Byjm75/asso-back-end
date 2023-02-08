import { RoleEnumType } from 'src/auth/roles.decorator';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Association {
  //Je génére la clé primaire
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //Je crée les colonnes
  @Column({
    nullable: false,
    unique: true,
  })
  name: string; //Je nomme le nom de la colonne et la type

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 14,
  })
  siret: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  rna: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 50,
  })
  theme: string;

  @Column({
    nullable: true,
  })
  website: string;

  @Column({
    nullable: true,
  })
  body: string;

  @Column({
    nullable: true,
  })
  picture: string;

  @Column({
    nullable: true,
  })
  favoris: boolean;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.ASSOCIATION,
  })
  role: RoleEnumType;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Méthode du "ondelete en Cascade permet de supprimer les tables associées"
  @OneToMany(() => Project, (projects) => projects.association_, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  projects: Project[];
}
