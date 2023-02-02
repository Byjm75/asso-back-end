import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { RoleEnumType } from '../roles.decorator';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginAssoDto {
  //------------------------------------------------------nom---------
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @IsString({
    message: ' *le nom doit être une chaine de caractère',
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  name: string;
  //------------------------------------------------------email---------
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
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
    message: ' *le mot de passe doit être une chaine de caractère',
  })
  @MinLength(8, {
    message: '*Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  password: string;
  role: RoleEnumType.ASSOCIATION;
}
