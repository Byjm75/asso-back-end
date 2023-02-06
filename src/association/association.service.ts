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
  async findAllAsso(): Promise<Association[]> {
    return await this.associationRepository.find();
  }
  //-------------------------------------------------------

  async findOneAsso(
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
    upDateAssoDto: UpdateAssociationDto,
    association: Association,
  ): Promise<Association> {
    const upDateAssociation = await this.associationRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur---------------!!!', idValue);
    console.log('id association-----------------------!!!', association.id);

    if (upDateAssociation.id !== association.id) {
      throw new MethodNotAllowedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    const { name, email, password, siret, rna, theme, url, body, picture } =
      upDateAssoDto;
    try {
      if (!upDateAssoDto.password) {
        upDateAssociation.password = upDateAssociation.password;
      } else {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateAssociation.password = hashedPassword;
      }
      if (!upDateAssoDto.name) {
        upDateAssociation.name = upDateAssociation.name;
      } else {
        upDateAssociation.name = upDateAssoDto.name;
      }
      if (!upDateAssoDto.email) {
        upDateAssociation.email = upDateAssociation.email;
      } else {
        upDateAssociation.email = upDateAssoDto.email;
      }
      if (!upDateAssoDto.siret) {
        upDateAssociation.siret = upDateAssociation.siret;
      } else {
        upDateAssociation.siret = upDateAssoDto.siret;
      }
      if (!upDateAssoDto.rna) {
        upDateAssociation.rna = upDateAssociation.rna;
      } else {
        upDateAssociation.rna = upDateAssoDto.rna;
      }
      if (!upDateAssoDto.theme) {
        upDateAssociation.theme = upDateAssociation.theme;
      } else {
        upDateAssociation.theme = upDateAssoDto.theme;
      }
      if (!upDateAssoDto.url) {
        upDateAssociation.url = upDateAssociation.url;
      } else {
        upDateAssociation.url = upDateAssoDto.url;
      }
      if (!upDateAssoDto.body) {
        upDateAssociation.body = upDateAssociation.body;
      } else {
        upDateAssociation.body = upDateAssoDto.body;
      }
      if (!upDateAssoDto.picture) {
        upDateAssociation.picture = upDateAssociation.picture;
      } else {
        upDateAssociation.picture = upDateAssoDto.picture;
      }
      return await this.associationRepository.save(upDateAssociation);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }
  async remove(id: string): Promise<Association | string> {
    const result = await this.associationRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'association trouvée avec l'id:${id}`);
    }
    return `Cette action a supprmé l'association #${id}`;
  }
}
