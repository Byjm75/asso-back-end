// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Association } from 'src/association/entities/association.entity';
// import { Donor } from 'src/donor/entities/donor.entity';
// import { Repository } from 'typeorm';

// //Création de la méthode du JWT
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(Donor, Association)
//     private utilisateursRepository: Repository<Donor, Association>,
//   ) {
//     super({
//       secretOrKey: 'jadorelecode',
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload: any): Promise<Donor, Association> {
//     console.log('validate');
//     const idUtilisateurPayload = payload.utilisateur.id;
//     // console.log('mail', emailUtilisateurPayload.email);
//     const user: Donor,
//       Association = await this.utilisateursRepository.findOneBy({
//         id: idUtilisateurPayload,
//       });

//     if (!user) throw new UnauthorizedException();
//     return user;
//   }
// }
