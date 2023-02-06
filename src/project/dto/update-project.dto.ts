import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDataURI,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';

//ICI je confirgure les éléments de la table qui peuvent être modifiés.
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *le thème doit être une chaine de caractère',
  })
  @MaxLength(10, {
    message: '*Le texte doit contenir au maximum 50 caractères',
  })
  topic: string;
  //------------------------------------------------------Texte---------
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le champ de texte doit être renseigné',
  })
  @IsString({
    message: ' *Le champ de texte doit être une chaine de caractère',
  })
  @MinLength(10, {
    message: '*Le champ de texte doit contenir au moins 1 caractère',
  })
  body: string;
  //-------------------------------------------------------------------
  @IsOptional()
  @IsDataURI()
  url: string;
  @IsOptional()
  @IsString()
  picture: string;
  @IsOptional()
  @IsBoolean()
  favoris: boolean;
}
