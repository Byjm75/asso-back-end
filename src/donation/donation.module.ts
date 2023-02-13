import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import { Donation } from './entities/donation.entity';
import { Association } from 'src/association/entities/association.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Donation, Donor, Project, Association]),
  ],
  controllers: [DonationController],
  providers: [DonationService],
  exports: [DonationService],
})
export class DonationModule {}
