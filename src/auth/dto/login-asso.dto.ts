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

  //--------------------------------------------------role
  role: RoleEnumType.ASSOCIATION;
}
