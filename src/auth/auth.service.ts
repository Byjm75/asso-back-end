import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/association/entities/association.entity';
import { Donor } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';

@Injectable()
export class AuthService {
  roleRepository: any;
  jwtService: any;
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    @InjectRepository(Association)
    private assoRepository: Repository<Association>,
  ) {}
  //-----------------------------------------Donateur---------------------------------
  // Création d'un compte donateur
  async createDonor(createDonorAuthDto: CreateDonorAuthDto) {
    const { pseudo, surname, firstname, email, password, picture } =
      createDonorAuthDto;
    console.log(
      "Ceci est l'objet donor---------------------------!!!!!",
      createDonorAuthDto,
    );
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // création d'une entité donor
    const donor = await this.donorRepository.save({
      pseudo,
      surname,
      firstname,
      email,
      password: hashedPassword,
      picture,
      role: 'donor',
    });
    try {
      const createdDonor = await this.donorRepository.save(donor);
      return createdDonor;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //   try {
  //     const roleDonor = await this.roleRepository.findOne({ role: 'donor' });
  //     console.log('roleDonor ', roleDonor);
  //     const createDonor = await this.donorRepository.save(createDonorAuthDto);
  //     console.log(createDonor);
  //     createDonor.role = roleDonor;
  //     if (createDonor.role !== 'donor') {
  //       throw new NotFoundException(`Pas un donor !!!`);
  //     }
  //     console.log('apres MAJ .role', createDonor);
  //     // hashage du mot de passe
  //     const saltRounds = 10;
  //     const password = createDonor.password;
  //     console.log('password: ', password);
  //     const hashed = await bcrypt.hash(password, saltRounds);
  //     createDonor.password = hashed;
  //     return await this.donorRepository.save(createDonor);
  //   } catch (error) {
  //     console.log('error----', error);
  //     if (error.code === '23505') {
  //       throw new ConflictException("l'email et ou le pseudo déjà existant");
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
  // // Connexion d'un compte donateur
  // async loginDonor(loginDonorDto: LoginDonorDto) {
  //   const donorFound = await this.donorRepository.findOneBy({
  //     pseudo: loginDonorDto.pseudo,
  //     email: loginDonorDto.email,
  //   });
  //   console.log('donorFound: ', donorFound);
  //   if (
  //     donorFound &&
  //     (await bcrypt.compare(loginDonorDto.password, donorFound.password))
  //   ) {
  //     const payload = {
  //       username: loginDonorDto.email,
  //       role: donorFound.role,
  //       id: donorFound.id,
  //     };
  //     console.log('payload: ', payload);
  //     return {
  //       access_token: this.jwtService.sign(payload),
  //     };
  //   } else {
  //     throw new UnauthorizedException(
  //       'Le couple email/password est incorrect!',
  //     );
  //   }

  //-----------------------------------------Association---------------------------------
  //Création d'un compte association
  async createrAsso(
    createAssoAuthDto: CreateAssoAuthDto,
  ): Promise<Association> {
    try {
      const roleAsso = await this.roleRepository.findOneBy({ role: 'asso' });
      console.log('roleDonor ', roleAsso);
      const createAsso = await this.assoRepository.save(createAssoAuthDto);
      console.log(createAsso);
      createAsso.role = roleAsso;
      if (createAsso.role !== 'asso') {
        throw new NotFoundException(`Pas una association !!!`);
      }
      console.log('apres MAJ .role', createAsso);
      // hashage du mot de passe
      const saltRounds = 10;
      const password = createAsso.password;
      console.log('password: ', password);
      const hashed = await bcrypt.hash(password, saltRounds);
      createAsso.password = hashed;
      return await this.assoRepository.save(createAsso);
    } catch (error) {
      console.log('error----', error);
      if (error.code === '23505') {
        throw new ConflictException("l'email et ou le pseudo déjà existant");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // Connexion d'un compte association
  async loginAsso(loginAssoDto: LoginAssoDto) {
    const assoFound = await this.assoRepository.findOneBy({
      name: loginAssoDto.name,
      email: loginAssoDto.email,
    });
    console.log('assoFound: ', assoFound);
    if (
      assoFound &&
      (await bcrypt.compare(loginAssoDto.password, assoFound.password))
    ) {
      const payload = {
        asso: loginAssoDto.email,
        role: assoFound.role,
        id: assoFound.id,
      };
      console.log('payload: ', payload);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Le couple email/password est incorrect!',
      );
    }
  }
}
