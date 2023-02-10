import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
// import { RoleEnumType } from 'src/donor/entities/donor.entity';

// Ici la class et propriétés nécessaire pour connexion au comptes des roles.
export class LoginDonorDto {
  //------------------------------------------------------email---------
  @IsNotEmpty({
    message: " *L'email ne peux pas être vide",
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
}
