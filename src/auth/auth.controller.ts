import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Donor } from 'src/donor/entities/donor.entity';
import { AuthService } from './auth.service';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';
import { GetDonor } from './get-user.decorator';
// import { RoleEnumType } from './roles.decorator';

//Dossier Authentification
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // private readonly jwtService: JwtService,
  ) {}
  //-----------------------------------------Donateur---------------------------------
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
  loginDonor(
    @Body() loginDonorDto: LoginDonorDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginDonor(loginDonorDto);
  }
  //-----------------------------------------Association---------------------------------
  // Ici l'association créer son profil
  @Post('register/asso')
  createAsso(@Body() createAssoAuthDto: CreateAssoAuthDto) {
    //On détermine les champs obligatoires à la création de compte
    if (
      createAssoAuthDto.name &&
      createAssoAuthDto.email &&
      createAssoAuthDto.password &&
      createAssoAuthDto.siret &&
      createAssoAuthDto.rna &&
      createAssoAuthDto.theme
    )
      return this.authService.createAsso(createAssoAuthDto);
    else {
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }
  @Post('login/asso')
  loginAsso(
    @Body() LoginAssoDto: LoginAssoDto,
  ): Promise<{ accessToken: string }> {
    if (LoginAssoDto.name && LoginAssoDto.email && LoginAssoDto.password) {
      return this.authService.loginAsso(LoginAssoDto);
    } else {
      throw new BadRequestException(
        `Les champs pseudo, email et/ou password n'ont pas été renseignés correctement!`,
      );
    }
  }
}
