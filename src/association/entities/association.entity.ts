import { RoleEnumType } from 'src/auth/roles.decorator';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Association {
  // Colonne de l'Id crée et transformé en string
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  // Colonne nom obligatoire et nom unique
  @Column({
    nullable: false,
    unique: true,
  })
  //Je nomme la colonne et son type
  name: string;

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

  // Colonne siret obligatoire
  @Column({
    nullable: false,
    type: 'char',
    length: 14,
  })
  siret: string;

  // Colonne rna obligatoire
  @Column({
    nullable: false,
    type: 'char',
    length: 10,
  })
  rna: string;

  // Colonne thème obligatoire
  @Column({
    nullable: false,
    type: 'char',
    length: 50,
  })
  theme: string;

  // Colonne site web non obligatoire
  @Column({
    nullable: true,
  })
  website: string;

  // Colonne champ de texte non obligatoire
  @Column({
    nullable: true,
  })
  body: string;

  // Colonne photo non obligatoire
  @Column({
    nullable: true,
  })
  picture: string;

  // Colonne favoris non obligatoire
  @Column({
    nullable: true,
  })
  favoris: string;

  // Colonne role généré automatiquement
  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.ASSOCIATION,
  })
  role: RoleEnumType;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  //Relation avec la table projet
  @OneToMany(() => Project, (projects) => projects.association_, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  projects: Project[];
}
