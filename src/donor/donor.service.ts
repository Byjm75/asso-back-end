import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DonorService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
  ) {}

  async findOneDonor(idValue: string): Promise<Donor> {
    const donorFound = await this.donorRepository.findOneBy({
      id: idValue,
    });
    console.log('donorFound----------------', donorFound);
    console.log('id du donateur----------------', idValue);
    console.log('Class-Donor----------------', Donor);
    if (!donorFound) {
      throw new NotFoundException(
        `pas de donateur trouvé avec l'id:${idValue}`,
      );
    }
    return donorFound;
  }

  async update(
    idValue: string,
    upDateDonorDto: UpdateDonorDto,
    donor: Donor,
  ): Promise<Donor> {
    //Je m'assure que seul cet donateur puisse modifier son profil
    if (donor.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à modifier ce profil.",
      );
    }
    const upDateDonor = await this.donorRepository.findOne({
      where: { id: idValue },
    });
    console.log('id requête utilisateur---------------!!!', idValue);
    console.log('id requête utilisateur---------------!!!', donor);
    console.log('where: { id: idValue }---------------!!!', idValue);

    if (!upDateDonor) {
      throw new NotFoundException("Le donateur n'existe pas");
    }
    const { pseudo, email, password, picture } = upDateDonorDto;
    try {
      if (upDateDonorDto.password) {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateDonor.password = hashedPassword;
      }
      if (upDateDonorDto.pseudo) {
        upDateDonor.pseudo = pseudo;
      }
      if (upDateDonorDto.email) {
        upDateDonor.email = email;
      }
      if (upDateDonorDto.picture) {
        upDateDonor.picture = picture;
      }
      return await this.donorRepository.save(upDateDonor);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }
  async deleteDonor(idValue: string, donor: Donor): Promise<Donor | string> {
    //Je m'assure que seul cet donateur puisse supprimer son profil
    if (donor.id !== idValue) {
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à supprimer ce compte.",
      );
    }
    const donorRemove = await this.donorRepository.delete({
      id: idValue,
    });
    console.log('donoooooorrrrr!!!!!', donor);
    if (donorRemove.affected === 0) {
      throw new NotFoundException(
        `pas de donateur trouvée avec l'id:${idValue}`,
      );
    }
    return `Cette action a supprmé le donateur #${idValue}`;
  }
  //---------------------------------------------------ADMIN----------
  // async findAllDonor(): Promise<Donor[]> {
  //   return await this.DonorRepository.find();
  // }
}
