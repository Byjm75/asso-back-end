import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';

//Création de la méthode du JWT
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {
    super({
      secretOrKey: 'jaimelesfairedons',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validateDonor(payload: any): Promise<Donor> {
    console.log('validate');
    const idDonorPayload = payload.donor.id;
    const donor: Donor = await this.donorRepository.findOneBy({
      id: idDonorPayload,
    });
    if (!donor) throw new UnauthorizedException();
    return donor;
  }
  async validateAsso(payload: any): Promise<Association> {
    console.log('validate');
    const idAssociationPayload = payload.association.id;
    const asso: Association = await this.associationRepository.findOneBy({
      id: idAssociationPayload,
    });
    if (!asso) throw new UnauthorizedException();
    return asso;
  }
}
// @Injectable()
// export class JwtStrategyAsso extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(Association)
//     private associationRepository: Repository<Association>,
//   ) {
//     super({
//       secretOrKey: 'jadoreLeCodeQuandCaFonctionneBien',
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }
//   async validate(payload: any): Promise<Association> {
//     console.log('validate');
//     const idAssociationPayload = payload.association.id;
//     const asso: Association = await this.associationRepository.findOneBy({
//       id: idAssociationPayload,
//     });
//     if (!asso) throw new UnauthorizedException();
//     return asso;
//   }
// }
