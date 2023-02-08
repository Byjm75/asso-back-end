import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';

export interface Utilisateur {
  donor?: Donor;
  association?: Association;
}

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Utilisateur => {
    const req = ctx.switchToHttp().getRequest();
    const user: Utilisateur = {
      donor: req.user.donor,
      association: req.user.association,
    };
    return user;
  },
);

// //création de la méthode Getuser pour Donor
// export const GetDonor = createParamDecorator(
//   (_data, ctx: ExecutionContext): Donor => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.user as Donor;
//   },
// );

// export const GetAsso = createParamDecorator(
//   (_data, ctx: ExecutionContext): Association => {
//     const req = ctx.switchToHttp().getRequest();
//     return req.user as Association;
//   },
// );
