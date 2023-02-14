import { Module } from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorController } from './donor.controller';
import { Donor } from './entities/donor.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Project } from 'src/project/entities/project.entity';
import { Association } from 'src/association/entities/association.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Donation } from 'src/donation/entities/donation.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Donor, Association, Donation]),
  ],
  controllers: [DonorController],
  providers: [DonorService],
  exports: [DonorService],
})
export class DonorModule {}
