import { Injectable } from '@nestjs/common';
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
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
  ) {}
  async create(
    createDonationDto: CreateDonationDto,
    donor: Donor,
    project: Project,
  ): Promise<Donation> {
    const { amount, by_month } = createDonationDto;
    const newDonation = await this.donationRepository.create({
      ...createDonationDto,
      project_: project,
    });
    try {
      if (createCategorieDto.title) {
        newCategorie.title = createCategorieDto.title;
      }
      return await this.categorieRepository.save(newCategorie);
    } catch {
      throw new Error('erreur test');
    }
  }

  findAll() {
    return `This action returns all donation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }

  update(id: number, updateDonationDto: UpdateDonationDto) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
