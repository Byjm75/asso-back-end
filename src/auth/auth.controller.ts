import { Controller, Post, Body } from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) {}

  // Ici le donateur créer son profil
  @Post('register/donor')
  createDonor(@Body() createDonorAuthDto: CreateDonorAuthDto) {
    return this.authService.registerDonor(createDonorAuthDto);
  }
  // Ici l'association créer son profil
  @Post('register/asso')
  createAsso(@Body() createAssoAuthDto: CreateAssoAuthDto) {
    return this.authService.registerAsso(createAssoAuthDto);
  }

  @Post('login/donor')
  loginDonor(
    @Body() loginDonorDto: LoginDonorDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginDonor(loginDonorDto);
  }

  @Post('login/asso')
  loginAsso(
    @Body() loginAssoDto: LoginAssoDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginAsso(loginAssoDto);
  }
}
