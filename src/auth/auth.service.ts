import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/association/entities/association.entity';
import { Repository } from 'typeorm';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Donor } from 'src/donor/entities/donor.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
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
    const donor = await this.donorRepository.create({
      ...createDonorAuthDto,
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
  // // Connexion d'un compte donateur
  async loginDonor(loginDonorDto: LoginDonorDto) {
    const { email, password } = loginDonorDto;
    const donor = await this.donorRepository.findOneBy({
      email,
    });
    console.log('je veux ton mail-----------!!!', email);
    console.log('je veux ton mdp------------!!!', password);
    //Ici comparasaison du MP Hashé
    if (donor && (await bcrypt.compare(password, donor.password))) {
      const payload = { donor };
      console.log('donor profil---------------!!!: ', payload);
      //Ici envoie du Token d'accés si authorisé
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
        throw new ConflictException('Le nom du donateur existe déja');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // Connexion d'un compte association
  async loginAsso(LoginAssoDto: LoginAssoDto) {
    const { email, password } = LoginAssoDto;
    const asso = await this.assoRepository.findOneBy({
      email,
    });
    console.log('asso--------------!!!!!', asso);
    console.log('je veux ton mail-----------!!!', email);
    console.log('je veux ton mdp------------!!!', password);
    //Ici comparasaison du MP Hashé
    if (asso && (await bcrypt.compare(password, asso.password))) {
      const payload = { asso };
      console.log('asso profil---------------!!!: ', payload);
      //Ici envoie du Token d'accés si autorisé
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Le couple email/password est incorrect!',
      );
    }
  }
}
