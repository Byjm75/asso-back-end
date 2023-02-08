import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
// import { RoleEnumType } from 'src/association/entities/association.entity';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginAssoDto {
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
    message: ' *Le mot de passe doit être une chaine de caractère',
  })
  password: string;
}
