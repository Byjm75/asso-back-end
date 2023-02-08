import {
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';
import * as bcrypt from 'bcrypt';
import { Donor } from 'src/donor/entities/donor.entity';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {}

  async findAllAsso(): Promise<Association[]> {
    return await this.associationRepository.find();
  }
  async findOneAsso(
    id: string,
    user: Donor | Association,
  ): Promise<Association> {
    if (!user) {
      throw new UnauthorizedException(
        'Vous devez être connecté pour accéder à ces données',
      );
    }
    const association = await this.associationRepository.findOneBy({ id });
    if (!association) {
      throw new NotFoundException(`Aucune association trouvée avec l'id ${id}`);
    }
    return association;
  }
  //------------------------------------------------Update!!!!-------------

  async update(
    idValue: string,
    upDateAssoDto: UpdateAssociationDto,
  ): Promise<Association> {
    const upDateAssociation = await this.associationRepository.findOne({
      where: { id: idValue },
    });
    console.log('UUUUUPDATE', upDateAssociation);
    if (!upDateAssociation) {
      throw new NotFoundException('Association not found');
    }
    const { name, email, password, theme, website, body, picture } =
      upDateAssoDto;
    try {
      if (upDateAssoDto.password) {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateAssociation.password = hashedPassword;
      }
      if (upDateAssoDto.name) {
        upDateAssociation.name = name;
      }
      if (upDateAssoDto.email) {
        upDateAssociation.email = email;
      }
      if (upDateAssoDto.theme) {
        upDateAssociation.theme = theme;
      }
      if (upDateAssoDto.website) {
        upDateAssociation.website = website;
      }
      if (upDateAssoDto.body) {
        upDateAssociation.body = body;
      }
      if (upDateAssoDto.picture) {
        upDateAssociation.picture = picture;
      }
      return await this.associationRepository.save(upDateAssociation);
    } catch (error) {
      throw new Error(error);
    }
  }
}
//   async remove(
//     id: string,
//     association: Association,
//   ): Promise<Association | string> {
//     const result = await this.associationRepository.delete({
//       id,
//     });
//     console.log('id association-----------------------!!!', association);
//     if (result.affected === 0) {
//       throw new NotFoundException(`pas d'association trouvée avec l'id:${id}`);
//     }
//     return `Cette action a supprmé l'association #${id}`;
//   }
// }
