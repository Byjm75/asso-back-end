import { IsBoolean, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

// Typage du Donateur pour la création d'une donation avec les décorateurs de Class-Validator (Assure la gestion d'erreur)
export class CreateDonationDto {
  //------------------------------------------------------amount
  @IsNotEmpty({
    message: ' *Le montant ne peux pas être vide',
  })
  @IsNumber()
  @Min(5, {
    message: ' *Le montant doit être de 5€ minimum',
  })
  amount: number;

  //------------------------------------------------------by_month
  @IsBoolean()
  by_month: boolean;

  //--------------------------------------------------clé-étrangére-relation-table-project
  // @IsUUID()
  // project_id: string;
  //--------------------------------------------------clé-étrangére-relation-table-donor
  // @IsUUID()
  // donor_id: string;
}
