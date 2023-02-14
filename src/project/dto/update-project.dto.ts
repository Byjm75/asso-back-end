import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateProjectDto } from './create-project.dto';

//ICI je confirgure les éléments de la table qui peuvent être modifiés.
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  //------------------------------------------------------topic
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le thème doit être renseigné',
  })
  @IsString({
    message: ' *le thème doit être une chaine de caractère',
  })
  @MaxLength(50, {
    message: '*Le texte doit contenir au maximum 50 caractères',
  })
  topic: string;

  //------------------------------------------------------body
  @IsOptional()
  @IsNotEmpty({
    message: ' *Le champ de texte doit être renseigné',
  })
  @IsString({
    message: ' *Le champ de texte doit être une chaine de caractère',
  })
  @MinLength(10, {
    message: '*Le champ de texte doit contenir au moins 10 caractère',
  })
  body: string;

  //---------------------------------------------------website
  @IsOptional()
  @IsUrl()
  website: string;

  //--------------------------------------------------photo
  @IsOptional()
  @IsString()
  picture: string;

  //--------------------------------------------------favoris
  @IsOptional()
  @IsString()
  favoris: string;

  //--------------------------------------------------clé-étrangére
  @IsUUID()
  association_id: string;
}
