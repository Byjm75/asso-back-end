import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';

export interface Utilisateur {
  donor?: Donor;
  association?: Association;
}
export const GetDonor = createParamDecorator(
  (_data, ctx: ExecutionContext): Donor => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req--- !!!!!!!!', req);
    const donor = req.user;
    console.log('req.user--- !!!!!!!!', req.user);
    console.log('donor = req.user-----------!!!!!!!!!!!!', donor);
    return donor;
  },
);
export const GetAsso = createParamDecorator(
  (_data, ctx: ExecutionContext): Association => {
    const req = ctx.switchToHttp().getRequest();
    console.log('req--- !!!!!!!!', req);
    const asso = req.user;
    console.log('req.user--- !!!!!!!!', req.user);
    console.log('asso = req.user-----------!!!!!!!!!!!!', asso);
    return asso;
  },
);
