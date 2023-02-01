import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';

@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Association)
    private DonorRepository: Repository<Association>,
  ) {}

  //--------------RESERVER A L'ADMIN---------------------
  findAll() {
    return `This action returns all association`;
  }
  //-------------------------------------------------------

  findOne(id: number) {
    return `This action returns a #${id} association`;
  }

  update(id: number, updateAssociationDto: UpdateAssociationDto) {
    return `This action updates a #${id} association`;
  }

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
