import {
  ForbiddenException,
  Injectable,
  NotFoundException,
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
    private associationRepository: Repository<Association>,
  ) {}

  //Affiche toutes les associations de la BDD, tous roles.
  async findAllAsso(): Promise<Association[]> {
    return await this.associationRepository.find();
  }

  //Trouve une association via son id, tous roles
  async findOneAsso(idValue: string): Promise<Association> {
    const association = await this.associationRepository.findOne({
      where: { id: idValue },
    });
    console.log('1 Service where: { id: idValue }---!!!', association);
    if (!association) {
      throw new NotFoundException(
        `Aucune association trouvée avec l'id ${idValue}`,
      );
    }
    return association;
  }

  //Uniquement l'association avec son ID peut modifier son profil
  async updateAsso(
    idValue: string,
    upDateAssoDto: UpdateAssociationDto,
    association: Association,
  ): Promise<Association> {
    console.log('2 Service upDateAssoDto---!!!', upDateAssoDto);
    console.log('3 Service association---!!!', association);

    //Je m'assure que seule cette association puisse modifier son profil
    if (association.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à supprimer ce compte.",
      );
    }
    const upDateAssociation = await this.associationRepository.findOne({
      where: { id: idValue },
    });
    console.log('4 Service where: { id: idValue }---!!!', upDateAssociation);

    if (!upDateAssociation) {
      throw new NotFoundException("L'association n'existe pas");
    }
    //Items du update-asso-Dto à modifier
    const { name, email, password, theme, website, body } = upDateAssoDto;
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
      console.log('return associationRepository.sav----!!!', upDateAssociation);
      return await this.associationRepository.save(upDateAssociation);
    } catch (error) {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

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
    console.log(
      '1 Service if (association.id !== idValue)---!!!',
      association.id,
    );
    console.log('2 Service if (association.id !== idValue)---!!!', idValue);
    const assoRemove = await this.associationRepository.delete({
      id: idValue,
    });
    if (assoRemove.affected === 0) {
      throw new NotFoundException("Cette association n'existe pas!");
    }
    return `Cette action a supprmé l'association.`;
  }
}
