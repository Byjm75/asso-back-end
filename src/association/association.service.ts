import {
  Injectable,
  MethodNotAllowedException,
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

  //--------------RESERVER A L'ADMIN---------------------
  findAll() {
    return `This action returns all association`;
  }
  //-------------------------------------------------------

  async findOne(
    idValue: string,
    association: Association,
  ): Promise<Association> {
    const assoFound = await this.associationRepository.findOneBy({
      id: idValue,
    });
    console.log('id association----------------', association.id);
    if (!assoFound) {
      throw new NotFoundException(
        `pas d'association trouvé avec l'id:${idValue}`,
      );
    }
    return assoFound;
  }
  //------------------------------------------------Update!!!!-------------
  async update(
    idValue: string,
    updateAssociationDto: UpdateAssociationDto,
    association: Association,
  ): Promise<Association> {
    const upDateAssociation = await this.associationRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur', idValue);
    console.log('id utilisateur', association.id);

    if (upDateAssociation.id !== association.id) {
      throw new MethodNotAllowedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    const { name, email, password, siret, rna, theme, url, body, picture } =
      updateAssociationDto;
    try {
      if (!updateAssociationDto.password) {
        upDateAssociation.password = upDateAssociation.password;
      } else {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateAssociation.password = hashedPassword;
      }
      if (!updateAssociationDto.name) {
        upDateAssociation.name = upDateAssociation.name;
      } else {
        upDateAssociation.name = upDateAssociation.name;
      }
      if (!updateAssociationDto.email) {
        upDateAssociation.email = upDateAssociation.email;
      } else {
        upDateAssociation.email = updateAssociationDto.email;
      }
      if (!updateAssociationDto.siret) {
        upDateAssociation.siret = upDateAssociation.siret;
      } else {
        upDateAssociation.siret = updateAssociationDto.siret;
      }
      if (!updateAssociationDto.rna) {
        upDateAssociation.rna = upDateAssociation.rna;
      } else {
        upDateAssociation.rna = updateAssociationDto.rna;
      }
      if (!updateAssociationDto.theme) {
        upDateAssociation.theme = upDateAssociation.theme;
      } else {
        upDateAssociation.theme = updateAssociationDto.theme;
      }
      if (!updateAssociationDto.url) {
        upDateAssociation.url = upDateAssociation.url;
      } else {
        upDateAssociation.url = updateAssociationDto.url;
      }
      if (!updateAssociationDto.body) {
        upDateAssociation.body = upDateAssociation.body;
      } else {
        upDateAssociation.body = updateAssociationDto.body;
      }
      if (!updateAssociationDto.picture) {
        upDateAssociation.picture = upDateAssociation.picture;
      } else {
        upDateAssociation.picture = updateAssociationDto.picture;
      }
      return await this.associationRepository.save(upDateAssociation);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }
}
