import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Association,
  RoleEnumType as RoleAssoEnumType,
} from 'src/association/entities/association.entity';
import { Donor, RoleEnumType } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    private jwtServiceDonor: JwtService,
    @InjectRepository(Association)
    private assoRepository: Repository<Association>,
    private jwtServiceAsso: JwtService,
  ) {}
  //Création d'un compte donateur
  async registerDonor(createDonorAuthDto: CreateDonorAuthDto) {
    const { pseudo, surname, firstname, email, password, picture, role } =
      createDonorAuthDto;
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPasswordDonor = await bcrypt.hash(password, salt);
    // création d'une entité donor
    const donor = this.donorRepository.create({
      pseudo,
      surname,
      firstname,
      email,
      password: hashedPasswordDonor,
      picture,
      role: RoleEnumType.DONOR,
    });
    //Ici on crée la gestion d'erreur (ne pouvant pas créer 2 fois le même compte).
    // On compare email et mot de passe pour savoir si le compte user existe déja.
    const pseudoExistAlready = await this.donorRepository.findBy({
      pseudo,
    });
    const emailExistAlready = await this.donorRepository.findBy({
      email,
    });
    if (pseudoExistAlready.length > 0) {
      throw new BadRequestException('Ce pseudo est déjà utilisé', {
        cause: new Error(),
      });
      return `L'utilisateur existe déja avec ce pseudo:${pseudo}`;
    } else if (emailExistAlready.length > 0) {
      throw new BadRequestException('Cette adresse mail est déjà utilisée', {
        cause: new Error(),
      });
      return `L'utilisateur existe déja avec ce mail:${email}`;
    }
    if (
      createDonorAuthDto.email.length < 4 ||
      createDonorAuthDto.password.length < 4 ||
      createDonorAuthDto.pseudo.length < 4
    ) {
      throw new BadRequestException(
        'Les champs doivent comporter au minimum 4 caractères',
        {
          cause: new Error(),
        },
      );
    }
    try {
      const createdDonor = await this.donorRepository.save(donor);
      return createdDonor;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Utilisateur existe déja avec ce pseudo');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //Création d'un compte association
  async registerAsso(createAssoAuthDto: CreateAssoAuthDto) {
    const {
      name,
      email,
      password,
      siret,
      rna,
      theme,
      url,
      body,
      picture,
      // role,
    } = createAssoAuthDto;
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPasswordAsso = await bcrypt.hash(password, salt);
    // création d'une entité association
    const asso = this.assoRepository.create({
      name,
      email,
      password: hashedPasswordAsso,
      siret,
      rna,
      theme,
      url,
      body,
      picture,
      role: RoleAssoEnumType.ASSO,
    });
    //Ici on crée la gestion d'erreur (ne pouvant pas créer 2 fois le même compte).
    // On compare email et mot de passe pour savoir si le compte user existe déja.
    const nameExistAlready = await this.assoRepository.findBy({
      name,
    });
    const emailExistAlready = await this.assoRepository.findBy({
      email,
    });
    if (nameExistAlready.length > 0) {
      throw new BadRequestException('Ce nom est déjà utilisé', {
        cause: new Error(),
      });
      return `L'association existe déja avec ce nom:${name}`;
    } else if (emailExistAlready.length > 0) {
      throw new BadRequestException('Cette adresse mail est déjà utilisée', {
        cause: new Error(),
      });
      return `L'association existe déja avec ce mail:${email}`;
    }
    if (
      createAssoAuthDto.email.length < 4 ||
      createAssoAuthDto.password.length < 4 ||
      createAssoAuthDto.name.length < 4
    ) {
      throw new BadRequestException(
        'Les champs doivent comporter au minimum 4 caractères',
        {
          cause: new Error(),
        },
      );
    }
    try {
      const createdAsso = await this.assoRepository.save(asso);
      return createdAsso;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('Association existe déja avec ce nom');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  //Connexion d'un donateur
  async loginDonor(loginDonorDto: LoginDonorDto) {
    const { pseudo, email, password, role } = loginDonorDto;
    const donor = await this.donorRepository.findOneBy({
      email,
    });
    console.log('je veux ton nom------------', pseudo);
    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
    console.log('je veux ton role-----------', role);
    //Ici comparasaison du MP Hashé
    if (donor && (await bcrypt.compare(password, donor.password))) {
      //Supprime la propriété de taches de l'objet l'utilisateur
      const payload = { donor };
      console.log('je veux ton profil--------', donor);
      //Ici envoie du Token d'accés
      const accessToken = await this.jwtServiceDonor.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, désolé...',
      );
    }
  }
  //Connexion d'un donateur
  async loginAsso(loginAssoDto: LoginAssoDto) {
    const { name, email, password, role } = loginAssoDto;
    const asso = await this.assoRepository.findOneBy({
      email,
    });
    console.log('je veux ton nom------------', name);
    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
    console.log('je veux ton role-----------', role);
    //Ici comparasaison du MP Hashé
    if (asso && (await bcrypt.compare(password, asso.password))) {
      //Supprime la propriété de taches de l'objet l'utilisateur
      const payload = { asso };
      console.log('je veux ton profil--------', asso);
      //Ici envoie du Token d'accés
      const accessToken = await this.jwtServiceAsso.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, désolé...',
      );
    }
  }
}

// create(createAuthDto: CreateAuthDto) {
//   return 'This action adds a new auth';
// }

// findAll() {
//   return `This action returns all auth`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} auth`;
// }

// // update(id: number, updateAuthDto: UpdateAuthDto) {
// //   return `This action updates a #${id} auth`;
// // }

// remove(id: number) {
//   return `This action removes a #${id} auth`;
// }
