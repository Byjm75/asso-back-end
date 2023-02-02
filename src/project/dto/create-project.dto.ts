import {
  IsDataURI,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  //------------------------------------------------------Topic---------
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
}
