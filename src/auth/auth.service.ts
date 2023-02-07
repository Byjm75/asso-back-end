import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/association/entities/association.entity';
import { Donor, RoleEnumType } from 'src/donor/entities/donor.entity';
import { Repository } from 'typeorm';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Donor)
    private donorRepository: Repository<Donor>,
    private jwtService: JwtService,
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
    const donor = await this.donorRepository.create({
      pseudo,
      surname,
      firstname,
      email,
      password: hashedPassword,
      picture,
    });
    try {
      const createdDonor = await this.donorRepository.save(donor);
      delete createdDonor.password;
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
  // // Connexion d'un compte donateur
  async loginDonor(loginDonorDto: LoginDonorDto) {
    // const role = RoleEnumType.DONOR;
    const { pseudo, email, password } = loginDonorDto;
    const donor = await this.donorRepository.findOneBy({
      pseudo,
    });
    // console.log('je veux ton role-----------', role);
    console.log('je veux ton pseudo------------!!!', pseudo);
    console.log('je veux ton mail-----------!!!', email);
    console.log('je veux ton mdp------------!!!', password);
    //Ici comparasaison du MP Hashé
    if (donor && (await bcrypt.compare(password, donor.password))) {
      const payload = { donor };
      console.log('donor profil---------------!!!: ', donor);
      //Ici envoie du Token d'accés
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Le couple email/password est incorrect!',
      );
    }
  }
  //-----------------------------------------Association---------------------------------
  //Création d'un compte association
  async createAsso(createAssoAuthDto: CreateAssoAuthDto) {
    const { name, email, password, siret, rna, theme } = createAssoAuthDto;
    console.log(
      "Ceci est l'objet association---------------------------!!!!!",
      createAssoAuthDto,
    );
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // création d'une entité donor
    const asso = await this.assoRepository.save({
      name,
      email,
      password: hashedPassword,
      siret,
      rna,
      theme,
    });
    try {
      const createdAsso = await this.assoRepository.save(asso);
      return createdAsso;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // Connexion d'un compte association
  async loginAsso(LoginAssoDto: LoginAssoDto) {
    const { name, email, password } = LoginAssoDto;
    const asso = await this.assoRepository.findOneBy({
      name,
    });
    console.log('je veux ton pseudo------------!!!', name);
    console.log('je veux ton mail-----------!!!', email);
    console.log('je veux ton mdp------------!!!', password);
    // console.log('je veux ton role-----------', role);
    //Ici comparasaison du MP Hashé
    if (asso && (await bcrypt.compare(password, asso.password))) {
      const payload = { asso };
      console.log('donor profil---------------!!!: ', asso);
      //Ici envoie du Token d'accés
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Le couple email/password est incorrect!',
      );
    }
  }
}
