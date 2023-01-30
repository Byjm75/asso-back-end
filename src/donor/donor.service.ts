import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateDonorDto } from './dto/create-donor.dto';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { Donor } from './entities/donor.entity';

@Injectable()
export class DonorService {
  constructor(
    @InjectRepository(Donor)
    private DonorRepository: Repository<Donor>,
  ) {}

  create(createDonorDto: CreateDonorDto) {
    return 'This action adds a new donor';
  }

  findAll() {
    return `This action returns all donor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donor`;
  }

  update(id: number, updateDonorDto: UpdateDonorDto) {
    return `This action updates a #${id} donor`;
  }

  remove(id: number) {
    return `This action removes a #${id} donor`;
  }
}
