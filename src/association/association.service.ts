import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>,
  ) {}
  //En fonction
  async findAllAsso(): Promise<Association[]> {
    return await this.associationRepository.find();
  }
  //En fonction
  async findOneAsso(idValue: string): Promise<Association> {
    const association = await this.associationRepository.findOneBy({
      id: idValue,
    });
    console.log('idValue-Service-------------!!!!!!!!', association);
    if (!association) {
      throw new NotFoundException(
        `Aucune association trouvée avec l'id ${idValue}`,
      );
    }
    return association;
  }
  //En fonction
  async updateAsso(
    idValue: string,
    upDateAssoDto: UpdateAssociationDto,
    association: Association,
  ): Promise<Association> {
    //Je m'assure que seule cette association puisse modifier son profil
    if (association.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à supprimer ce compte.",
      );
    }
    const upDateAssociation = await this.associationRepository.findOne({
      where: { id: idValue },
    });
    console.log(
      'upDateAssociation-via-IdValue-Service-------------!!!!!!!!!!',
      upDateAssociation,
    );
    console.log(
      'asso: Utilisateur,-Service-------------!!!!!!!!!!',
      association,
    );
    if (!upDateAssociation) {
      throw new NotFoundException("L'association n'existe pas");
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
  //En fonction
  async deleteAsso(
    idValue: string,
    association: Association,
  ): Promise<Association | string> {
    //Je m'assure que seul cette association puisse supprimer son profil
    if (association.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à supprimer ce compte.",
      );
    }
    const assoRemove = await this.associationRepository.delete({
      id: idValue,
    });
    console.log('IdValue-Service-------------!!!!!!!!!!', idValue);
    console.log(
      'asso: Utilisateur,-Service-------------!!!!!!!!!!',
      association,
    );

    if (assoRemove.affected === 0) {
      throw new NotFoundException("Cette association n'existe pas!");
    }
    return `Cette action a supprmé l'association #${idValue}`;
  }
}
