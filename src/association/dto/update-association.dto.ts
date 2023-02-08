import { PartialType } from '@nestjs/mapped-types';
import {
  IsDataURI,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAssoAuthDto } from 'src/auth/dto/create-asso.dto';
import { RoleEnumType } from 'src/auth/roles.decorator';

export class UpdateAssociationDto extends PartialType(CreateAssoAuthDto) {
  //------------------------------------------------------nom---------
  @IsOptional()
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
  @IsOptional()
  @IsNotEmpty({
    message: "*L'email nom ne peux pas être vide",
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
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule et un nombre',
  })
  password: string;
  hashedPassword: string;
  //------------------------------------------------------thème---------
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *Le thème doit être une chaine de caractère',
  })
  theme: string;
  //---------------------------------------------------------------------
  @IsOptional()
  @IsUrl()
  website: string;
  //------------------------------------------------------body---------
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
  role: RoleEnumType.ASSOCIATION;
}
