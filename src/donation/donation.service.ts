import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationService {
  projectService: any;
  constructor(
    @InjectRepository(Donation)
    private donationRepository: Repository<Donation>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async createDon(
    id: string,
    createDonationDto: CreateDonationDto,
    donor: Donor,
  ): Promise<Donation> {
    // Verify if the project exists
    const project = await this.projectRepository.findOneBy({ id: id });
    console.log('const--project--Service---!!!', project);
    if (!project) {
      throw new NotFoundException("Ce projet n'existe pas.");
    }
    // Create the donation
    const { amount, by_month } = createDonationDto;
    const donation = new Donation();
    donation.amount = amount;
    donation.by_month = by_month;
    donation.project_ = project;
    donation.donor_ = donor;

    return await this.donationRepository.save(donation);
  }

  // async findAllDonation(idValue: string, donor: Donor): Promise<Donation[]> {
  //   const donationFound = await this.donationRepository.findBy({
  //     id: idValue,
  //   });
  //   console.log('donationFound--Service---!!!', donationFound);
  //   if (!donationFound) {
  //     throw new NotFoundException(`Donations non trouvée`);
  //   }
  //   return donationFound;
  // }

  //Trouve une donation via son id
  async findOneDonation(idValue: string): Promise<Donation> {
    const donationFound = await this.donationRepository.findOne({
      where: { id: idValue },
    });
    if (!donationFound) {
      throw new NotFoundException(`Donation non trouvé`);
    }
    return donationFound;
  }

  //Uniquement un donateur avec son ID peut modifier sa donation
  async updateDonation(
    idValue: string,
    updateDonationDto: UpdateDonationDto,
    donor: Donor,
  ): Promise<Donation> {
    console.log('1 Service idValue---!!!', idValue);
    console.log('2 Service updateDonationDto---!!!', updateDonationDto);
    console.log('3 Service donor---!!!', donor);

    const donationToUpdate = await this.donationRepository.findOne({
      where: { id: idValue },
    });
    //Je m'assure que seul ce donateur puisse modifier sa donation
    if (!donor || donor.id !== donationToUpdate.donor_.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    console.log('4-IF-!donor ||', donor);
    console.log('5-IF-donor.id !== donor.id', donor.id);

    if (!donationToUpdate) {
      throw new NotFoundException(`Donation non trouvée`);
    }
    console.log('donationToUpdate-Service---!!!', !donationToUpdate);

    //Récupére les items du updateDonationDto à modifier
    const { amount, by_month } = updateDonationDto;
    if (updateDonationDto.amount) {
      donationToUpdate.amount = amount;
    }
    if (updateDonationDto.by_month) {
      donationToUpdate.by_month = by_month;
    }
    console.log('return-donationRepository.save----!!!!', donationToUpdate);
    return await this.donationRepository.save(donationToUpdate);
  }

  async deleteDonation(
    idValue: string,
    donor: Donor,
  ): Promise<Donation | string> {
    const dononationToDelete = await this.donationRepository.findOne({
      where: { id: idValue },
    });
    if (!donor || donor.id !== dononationToDelete.donor_.id) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à supprimer cette donation",
      );
    }
    if (!dononationToDelete) {
      throw new NotFoundException("Cette donation n'existe pas");
    }
    await this.donationRepository.delete(idValue);
    return `Cette action a supprmé la donation`;
  }
}
