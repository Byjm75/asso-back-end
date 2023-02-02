import { IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  @Min(1)
  amount: number;
  @IsBoolean()
  by_month: boolean;
}
