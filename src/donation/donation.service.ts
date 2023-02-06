import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation } from './entities/donation.entity';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(
    createDonationDto: CreateDonationDto,
    donor: Donor,
  ): Promise<Donation> {
    const newDonation = await this.donationRepository.create({
      ...createDonationDto,
      donor_: donor,
    });
    return await this.donationRepository.save(newDonation);
  }

  async findAll(donor: Donor): Promise<Donation[]> {
    const donationFound = await this.donationRepository.findBy({
      donor_: donor,
    });
    console.log('donationFound', donationFound);
    if (!donationFound) {
      throw new NotFoundException(`Catérorie non trouvée`);
    }
    return donationFound;
  }

  async findOne(idValue: string, donor: Donor): Promise<Donation> {
    const donationFound = await this.donationRepository.findOneBy({
      id: idValue,
      donor_: donor,
    });
    if (!donationFound) {
      throw new NotFoundException(`Donation non trouvé avec l'id:${idValue}`);
    }
    return donationFound;
  }

  async update(
    idValue: string,
    updateDonationDto: UpdateDonationDto,
    donor: Donor,
  ): Promise<Donation | string> {
    console.log(idValue);
    console.log('donor---------------!!!', donor);
    const query = this.donationRepository.createQueryBuilder();
    query.where({ id: idValue }).andWhere({ donor_: donor });
    const updateDonation = await query.getOne();
    console.log('TO UPDATE ', updateDonation);

    if (!updateDonation) {
      throw new NotFoundException(`Donation non trouvée avec l'id:${idValue}`);
    }

    try {
      if (updateDonationDto.amount !== null) {
        updateDonation.amount = updateDonationDto.amount;
      }
      if (updateDonationDto.by_month !== null) {
        updateDonation.by_month = updateDonationDto.by_month;
      }
      return await this.projectRepository.save(updateDonation);
    } catch {
      throw new Error('autre erreur tâche');
    }
  }

  async remove(idValue: string, donor: Donor): Promise<Donation | string> {
    const result = await this.donationRepository.delete({
      donor_: donor,
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Donation non trouvé avec le titre:${idValue}`,
      );
    }
    return `Cette action entraine la suppresion de la donation:${idValue}`;
  }
}
