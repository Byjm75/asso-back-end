import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAssoAuthDto } from 'src/auth/dto/create-asso.dto';
import { RoleEnumType } from '../entities/association.entity';

export class UpdateAssociationDto extends PartialType(CreateAssoAuthDto) {
  //------------------------------------------------------nom---------
  @IsOptional()
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
  //------------------------------------------------------Siret---------
  @IsOptional()
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
    message: '*Le Siret doit contenir au max 14 caractères',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])/, {
    message: '*Le Siret doit contenir une majuscule et un nombre',
  })
  siret: string;
  //------------------------------------------------------Rna---------
  @IsOptional()
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
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *le thème doit être une chaine de caractère',
  })
  theme: string;
  //---------------------------------------------------------------------
  @IsOptional()
  @IsString()
  url: string;
  @IsOptional()
  @IsString()
  body: string;
  @IsOptional()
  @IsString()
  picture: string;
  roleA: RoleEnumType.ASSO;
}
