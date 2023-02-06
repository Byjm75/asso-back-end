import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';

//création de la méthode Getuser pour Donor
export const GetDonor = createParamDecorator(
  (_data, ctx: ExecutionContext): Donor => {
    const req = ctx.switchToHttp().getRequest();
    const donor: Donor = {
      ...req.user,
    };
    return donor;
  },
);
//création de la méthode Getuser pour Association
export const GetAsso = createParamDecorator(
  (_data, ctx: ExecutionContext): Association => {
    const req = ctx.switchToHttp().getRequest();
    const asso: Association = {
      ...req.user,
    };
    return asso;
  },
);
