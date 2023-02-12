import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';

export interface Utilisateur {
  donor?: Donor;
  association?: Association;
}
//  2 GetUtilsateurs pour 2 utilsateurs distinct
//  Ici le donateur
export const GetDonor = createParamDecorator(
  (_data, ctx: ExecutionContext): Donor => {
    const req = ctx.switchToHttp().getRequest();
    console.log('1 get-user-deco-req---!!!', req);
    const donor = req.user;
    console.log('2 get-user-deco-req.user---!!!', donor);
    console.log('3 get-user-deco-req.user---!!!', req.user);
    return donor;
  },
);
//  Ici l'association
export const GetAsso = createParamDecorator(
  (_data, ctx: ExecutionContext): Association => {
    const req = ctx.switchToHttp().getRequest();
    console.log('1 get-user-deco-req---!!!', req);
    const asso = req.user;
    console.log('2 get-user-deco-req.association---!!!', asso);
    console.log('3 get-user-deco-req.association---!!!', req.user);
    return asso;
  },
);
