import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DonorService {
  constructor(
    @InjectRepository(Donor)
    private DonorRepository: Repository<Donor>,
  ) {}

  async findAllDonor(): Promise<Donor[]> {
    return await this.DonorRepository.find();
  }

  async findOneDonor(idValue: string, donor: Donor): Promise<Donor> {
    const assoFound = await this.DonorRepository.findOneBy({
      id: idValue,
    });
    console.log('id du donateur----------------', donor.id);
    if (!assoFound) {
      throw new NotFoundException(
        `pas de donateur trouvé avec l'id:${idValue}`,
      );
    }
    return assoFound;
  }

  async update(
    idValue: string,
    upDateDonorDto: UpdateDonorDto,
    donor: Donor,
  ): Promise<Donor> {
    const upDateDonor = await this.DonorRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur---------------!!!', idValue);
    console.log('id association-----------------------!!!', donor.id);

    // if (upDateAssociation.id !== association.id) {
    //   throw new MethodNotAllowedException(
    //     "Vous n'êtes pas autorisé à modifier ces informations",
    //   );
    // }
    const { pseudo, surname, firstname, email, password, picture } =
      upDateDonorDto;
    try {
      if (!upDateDonorDto.password) {
        upDateDonor.password = upDateDonor.password;
      } else {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateDonor.password = hashedPassword;
      }
      if (!upDateDonorDto.pseudo) {
        upDateDonor.pseudo = upDateDonor.pseudo;
      } else {
        upDateDonor.pseudo = upDateDonorDto.pseudo;
      }
      if (!upDateDonorDto.surname) {
        upDateDonor.surname = upDateDonor.surname;
      } else {
        upDateDonor.surname = upDateDonorDto.surname;
      }
      if (!upDateDonorDto.firstname) {
        upDateDonor.firstname = upDateDonor.firstname;
      } else {
        upDateDonor.firstname = upDateDonorDto.firstname;
      }
      if (!upDateDonorDto.email) {
        upDateDonor.email = upDateDonor.email;
      } else {
        upDateDonor.email = upDateDonorDto.email;
      }
      if (!upDateDonorDto.picture) {
        upDateDonor.picture = upDateDonor.picture;
      } else {
        upDateDonor.picture = upDateDonorDto.picture;
      }
      return await this.DonorRepository.save(upDateDonor);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }
  async remove(id: string): Promise<Donor | string> {
    const result = await this.DonorRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`pas de donateur trouvée avec l'id:${id}`);
    }
    return `Cette action a supprmé le donateur #${id}`;
  }
}
