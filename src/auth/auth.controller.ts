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
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  //-----------------------------------------Donateur---------------------------------
  // Ici le donateur créer son profil et ce log
  @Post('register/donor')
  create(@Body() createDonorAuthDto: CreateDonorAuthDto) {
    return this.authService.createDonor(createDonorAuthDto);
  }

  @Post('login/donor')
  async login(
    @Body() loginDonorDto: LoginDonorDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginDonor(loginDonorDto);
  }
  //-----------------------------------------Association---------------------------------
  // Ici l'association créer son profil
  @Post('register/association')
  createAsso(@Body() createAssoAuthDto: CreateAssoAuthDto) {
    //On détermine les champs obligatoires à la création de compte
    return this.authService.createAsso(createAssoAuthDto);
  }

  @Post('login/asso')
  loginAsso(
    @Body() LoginAssoDto: LoginAssoDto,
  ): Promise<{ accessToken: string }> {
    if (LoginAssoDto.email && LoginAssoDto.password) {
      return this.authService.loginAsso(LoginAssoDto);
    } else {
      throw new BadRequestException(
        `Les champs pseudo, email et/ou password n'ont pas été renseignés correctement!`,
      );
    }
  }
}
