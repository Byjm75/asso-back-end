// import { RoleEnumType } from 'src/auth/roles.decorator';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class Association {
//   //Je génére la clé primaire
//   @PrimaryGeneratedColumn('uuid')
//   id?: string;

//   //Je crée les colonnes
//   @Column({
//     nullable: false,
//   })
//   name: string; //Je nomme le nom de la colonne et la type

//   @Column({
//     nullable: false,
//   })
//   email: string;

//   @Column({
//     nullable: false,
//   })
//   password: string;

//   @Column({
//     nullable: false,
//     type: 'varchar',
//     length: 14,
//   })
//   siret: string;

//   @Column({
//     nullable: false,
//     type: 'varchar',
//     length: 10,
//   })
//   rna: string;

//   @Column({
//     nullable: false,
//     type: 'varchar',
//     length: 50,
//   })
//   theme: string;

//   @Column({
//     nullable: true,
//   })
//   url: string;

//   @Column({
//     nullable: true,
//   })
//   body: string;

//   @Column({
//     nullable: true,
//   })
//   picture?: string;

//   @Column({
//     type: 'enum',
//     enum: RoleEnumType,
//     default: RoleEnumType.ASSOCIATION,
//   })
//   role: RoleEnumType;

//   //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
//   //Méthode du "ondelete en Cascade permet de supprimer les tables associées"
// }
