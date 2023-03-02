import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { RoleEnumType } from '../roles.decorator';

// Typage de Association pour la modification de compte avec les décorateurs de Class-Validator (Assure la gestion d'erreur)
export class CreateAssoAuthDto {
  //------------------------------------------------------nom
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

  //-----------------------------------------------------email
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

  //--------------------------------------------------mot de passe
  @IsNotEmpty({
    message: ' *Le mot de passe ne peux pas être vide',
  })
  @IsString({
    message: ' *Le mot de passe doit être une chaine de caractère',
  })
  @MinLength(8, {
    message: '*Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^\S*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      "*Le mot de passe doit contenir une Majuscule, une minuscule, un nombre et pas d'espace",
  })
  password: string;

  //------------------------------------------------------Siret
  @IsNotEmpty({
    message: ' *Le Siret ne peux pas être vide',
  })
  @IsString({
    message: ' *le Siret doit être une chaine de caractère',
  })
  @Length(14, 14, {
    message: '*Le Siret doit contenir exactement 14 caractères',
  })
  @Matches(/^[A-Z][0-9]{13}$/, {
    message:
      '*Le Siret doit commencer par une majuscule et contenir 13 chiffres',
  })
  siret: string;

  //------------------------------------------------------Rna
  @IsNotEmpty({
    message: ' *Le Rna ne peux pas être vide',
  })
  @IsString({
    message: ' *le Rna doit être une chaine de caractère',
  })
  @Length(10, 10, {
    message: '*Le Siret doit contenir exactement une Majuscule et 13 chiffres',
  })
  @Matches(/^[A-Z][0-9]{9}$/, {
    message: '*Le Rna doit contenir exactement une Majuscule et 9 chiffres',
  })
  rna: string;

  //---------------------------------------------------thème
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *Le thème doit être une chaine de caractère',
  })
  @MaxLength(50, {
    message: '*Le thème doit contenir au max 50 caractères',
  })
  theme: string;

  //---------------------------------------------------website
  @IsOptional()
  @IsUrl()
  website: string;

  //----------------------------------------------------body
  @IsOptional()
  @IsString({
    message: ' *Le champ de texte doit être une chaine de caractère',
  })
  @MinLength(10, {
    message: '*Le champ de texte doit contenir au moins 10 caractère',
  })
  body: string;

  //--------------------------------------------------role
  role: RoleEnumType.ASSOCIATION;
}
