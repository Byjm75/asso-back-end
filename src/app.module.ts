import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonorModule } from './donor/donor.module';
import { AssociationModule } from './association/association.module';
import { ProjectModule } from './project/project.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Donor } from './donor/entities/donor.entity';
import { Association } from './association/entities/association.entity';
import { Project } from './project/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      //autoLoadEntities: true,
    }),
    MulterModule.register({ dest: './files' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'files') }),
    TypeOrmModule.forFeature([Image]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Donor, Association, Project],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    DonorModule,
    AssociationModule,
    ProjectModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
