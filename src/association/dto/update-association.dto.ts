import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { CreateAssoAuthDto } from 'src/auth/dto/create-asso.dto';
import { RoleEnumType } from 'src/auth/roles.decorator';

// Typage de Association pour la modification de compte avec les décorateurs de Class-Validator (Assure la gestion d'erreur)
export class UpdateAssociationDto extends PartialType(CreateAssoAuthDto) {
  //------------------------------------------------------nom
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @IsString({
    message: ' *Le nom doit être une chaine de caractère',
  })
  name: string;

  //-----------------------------------------------------email
  @IsOptional()
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

  //------------------------------------------------mot de passe
  @IsOptional()
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
      '*Le mot de passe doit contenir une Majuscule, une minuscule et un nombre',
  })
  password: string;
  hashedPassword: string;

  //---------------------------------------------------thème
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *Le thème doit être une chaine de caractère',
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

  //--------------------------------------------------photo
  @IsOptional()
  @IsString()
  picture: string;

  //--------------------------------------------------role
  role: RoleEnumType.ASSOCIATION;
}
