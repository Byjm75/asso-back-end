import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';
import { RoleEnumType } from './roles.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {
    super({
      secretOrKey: 'jaimecequejefais',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    if (payload.donor && payload.donor.role === RoleEnumType.DONOR) {
      const idDonorPayload = payload.donor.id;
      const donor = await this.donorRepository.findOneBy({
        id: idDonorPayload,
      });
      console.log('donor------!!!!!!!!! : ', donor);

      if (!donor) {
        throw new UnauthorizedException(
          `Le Donateur avec l'id "${donor}" n'a pas été trouvée.`,
        );
      }
      return donor;
    }
    if (payload.asso && payload.asso.role === RoleEnumType.ASSOCIATION) {
      const idAssociationPayload = payload.asso.id;
      const association = await this.associationRepository.findOneBy({
        id: idAssociationPayload,
      });
      console.log('association------!!!!!!!!! : ', association);

      if (!association) {
        throw new UnauthorizedException(
          `L'Association avec l'id "${association}" n'a pas été trouvée.`,
        );
      }
      return association;
    }
    throw new UnauthorizedException(
      `Veuillez vous enregistrez et vous connectez`,
    );
  }
}
