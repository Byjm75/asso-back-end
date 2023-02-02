import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire à la création d'un compte
export class CreateDonorAuthDto {
  //-----------------------------------------------------pseudo--------
  @IsNotEmpty({
    message: ' *Le pseudo ne peux pas être vide',
  })
  @IsString({
    message: ' *Le pseudo doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le pseudo ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le pseudo doit contenir au moins un caractère ',
  })
  pseudo: string;
  //------------------------------------------------------prénom---------
  @IsNotEmpty({
    message: ' *Le prénom ne peux pas être vide',
  })
  @IsString({
    message: ' *Le prénom doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le prénom doit contenir au moins un caractère ',
  })
  surname: string;
  //------------------------------------------------------nom---------
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @IsString({
    message: ' *Le nom doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  firstname: string;
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
  @IsString()
  @MinLength(8, {
    message: '*Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  password: string;
  //----------------------------------------------------------------------------
  @IsOptional()
  @IsString()
  picture: string;
  // role: RoleEnumType.DONOR;
}
