import { Module } from '@nestjs/common';
import { DonorService } from './donor.service';
import { DonorController } from './donor.controller';
import { Donor } from './entities/donor.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Project } from 'src/project/entities/project.entity';
import { Association } from 'src/association/entities/association.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Donor, Project, Association]),
  ],
  controllers: [DonorController],
  providers: [DonorService],
})
export class DonorModule {}
