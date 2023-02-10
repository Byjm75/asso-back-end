import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({
    message: ' *Le montant ne peux pas être vide',
  })
  @IsNumber()
  @Min(1, {
    message: ' *Le montant doit être de 10€ minimum',
  })
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  by_month: boolean;
}
