import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsDataURI,
} from 'class-validator';
// import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire à la création d'un compte
export class CreateAssoAuthDto {
  //------------------------------------------------------nom---------
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @IsString({
    message: ' *Le nom doit être une chaine de caractère',
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  name: string;
  //------------------------------------------------------email---------
  @IsNotEmpty({
    message: "*L'email ne peux pas être vide",
  })
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  @IsString()
  email: string;
  //------------------------------------------------------mot de passe---------
  @IsNotEmpty({
    message: ' *Le mot de passe ne peux pas être vide',
  })
  @IsString({
    message: ' *Le mot de passe doit être une chaine de caractère',
  })
  @MinLength(8, {
    message: '*Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  password: string;
  //------------------------------------------------------Siret---------
  @IsNotEmpty({
    message: ' *Le Siret ne peux pas être vide',
  })
  @IsString({
    message: ' *le Siret doit être une chaine de caractère',
  })
  @MinLength(1, {
    message: '*Le Siret doit contenir au moins 1 caractère',
  })
  @MaxLength(14, {
    message: '*Le Siret doit contenir au maximum 14 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])/, {
    message: '*Le Siret doit contenir une majuscule et un nombre',
  })
  siret: string;
  //------------------------------------------------------Rna---------
  @IsNotEmpty({
    message: ' *Le Rna ne peux pas être vide',
  })
  @IsString({
    message: ' *le Rna doit être une chaine de caractère',
  })
  @MinLength(1, {
    message: '*Le Rna doit contenir au moins 1 caractère',
  })
  @MaxLength(10, {
    message: '*Le Rna doit contenir au max 10 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])/, {
    message: '*Le Rna doit contenir une majuscule et un nombre',
  })
  rna: string;
  //------------------------------------------------------thème---------
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *Le thème doit être une chaine de caractère',
  })
  @MaxLength(50, {
    message: '*Le thème doit contenir au max 10 caractères',
  })
  theme: string;
  //-------------------------------------------------------------------
  @IsOptional()
  @IsDataURI()
  url: string;
  //---------------------------------------------------body------------
  @IsOptional()
  @IsString({
    message: ' *Le champ de texte doit être une chaine de caractère',
  })
  @MinLength(10, {
    message: '*Le champ de texte doit contenir au moins 10 caractère',
  })
  body: string;
  //---------------------------------------------------------------------
  @IsOptional()
  @IsString()
  picture: string;
  // role: RoleEnumType.ASSOCIATION;
}
