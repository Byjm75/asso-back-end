import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Project } from './entities/project.entity';
import { Association } from 'src/association/entities/association.entity';
import { Donation } from 'src/donation/entities/donation.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Project, Association, Donation]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
