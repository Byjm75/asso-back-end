import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CreateDonorAuthDto } from 'src/auth/dto/create-donor.dto';
import { RoleEnumType } from '../entities/donor.entity';

export class UpdateDonorDto extends PartialType(CreateDonorAuthDto) {
  //-----------------------------------------------------pseudo--------
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le pseudo ne peux pas être vide',
  })
  @IsString({
    message: ' *le pseudo doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le pseudo ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le pseudo doit contenir au moins un caractère ',
  })
  pseudo: string;
  //------------------------------------------------------prénom---------
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le prénom ne peux pas être vide',
  })
  @IsString({
    message: ' *le prénom doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le prénom doit contenir au moins un caractère ',
  })
  surname: string;
  //------------------------------------------------------nom---------
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @IsString({
    message: ' *le nom doit être une chaine de caractère',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  firstname: string;
  //------------------------------------------------------email---------
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
  //------------------------------------------------------mot de passe---------
  @IsOptional()
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
  picture: string;
  roleD: RoleEnumType.DONOR;
}
