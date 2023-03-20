import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

// Typage de création de projet avec les décorateurs de Class-Validator (Assure la gestion d'erreur)
export class CreateProjectDto {
  //-------------topic
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
  //-----------body
  @IsNotEmpty({
    message: ' *Le champ de texte doit être renseigné',
  })
  @IsString({
    message: ' *Le champ de texte doit être une chaine de caractère',
  })
  @MinLength(10, {
    message: '*Le champ de texte doit contenir au moins 10 caractères',
  })
  body: string;
  //--------website
  @IsOptional()
  @IsUrl()
  website: string;
  //---------clé-étrangére-relation-table-association
  @IsUUID()
  association_id: string;
}
