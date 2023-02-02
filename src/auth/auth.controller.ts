import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';

//Dossier Authentification
@Controller('auth')
export class AuthController {
  donorService: any;
  assoService: any;
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  // Ici le donateur créer son profil et ce log
  @Post('register/donor')
  createDonor(@Body() createDonorAuthDto: CreateDonorAuthDto) {
    //On détermine les champs obligatoires à la création de compte
    if (
      createDonorAuthDto.pseudo &&
      createDonorAuthDto.surname &&
      createDonorAuthDto.firstname &&
      createDonorAuthDto.email &&
      createDonorAuthDto.password
    )
      return this.authService.createDonor(createDonorAuthDto);
    else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Post('login/donor')
  async loginDonor(
    @Body() donor: LoginDonorDto,
  ): Promise<{ access_token: string }> {
    if (donor.pseudo && donor.email && donor.password) {
      return this.authService.loginDonor(donor);
    } else {
      throw new BadRequestException(
        `Les champs pseudo, email et/ou password n'ont pas été renseignés correctement!`,
      );
    }
  }
  // Ici l'association créer son profil
  @Post('register/asso')
  createrAsso(@Body() createAssoAuthDto: CreateAssoAuthDto) {
    //On détermine les champs obligatoires à la création de compte
    if (
      createAssoAuthDto.name &&
      createAssoAuthDto.email &&
      createAssoAuthDto.password &&
      createAssoAuthDto.siret &&
      createAssoAuthDto.rna &&
      createAssoAuthDto.theme
    )
      return this.authService.createrAsso(createAssoAuthDto);
    else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Post('login/asso')
  async loginAsso(
    @Body() asso: LoginAssoDto,
  ): Promise<{ access_token: string }> {
    if (asso.name && asso.email && asso.password) {
      return this.authService.loginAsso(asso);
    } else {
      throw new BadRequestException(
        `Les champs pseudo, email et/ou password n'ont pas été renseignés correctement!`,
      );
    }
  }
}
