import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from 'src/donor/entities/donor.entity';
import { Project } from 'src/project/entities/project.entity';
import { Association } from './entities/association.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Donor, Project, Association]),
  ],
  controllers: [AssociationController],
  providers: [AssociationService],
  exports: [AssociationService],
})
export class AssociationModule {}
