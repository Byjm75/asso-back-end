import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAssoAuthDto } from './dto/create-asso.dto';
import { CreateDonorAuthDto } from './dto/create-donor.dto';
import { LoginAssoDto } from './dto/login-asso.dto';
import { LoginDonorDto } from './dto/login-donor.dto';

// localhost:8082/api/auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //-----------------------------------------Donateur---------------------------------
  // localhost:8082/api/auth/register/donor
  // Ici le donateur créer son profil
  @Post('register/donor')
  create(@Body() createDonorAuthDto: CreateDonorAuthDto) {
    return this.authService.createDonor(createDonorAuthDto);
  }

  // localhost:8082/api/auth/register/donor
  // Ici le donateur se connect à son profil
  @Post('login/donor')
  async loginDonor(
    @Body() loginDonorDto: LoginDonorDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginDonor(loginDonorDto);
  }
  //-----------------------------------------Association-------------------------------
  // localhost:8082/api/auth/register/association
  // Ici l'association créer son profil
  @Post('register/association')
  createAsso(@Body() createAssoAuthDto: CreateAssoAuthDto) {
    return this.authService.createAsso(createAssoAuthDto);
  }

  // localhost:8082/api/auth/login/association
  // Ici l'association se connect à son profil
  @Post('login/association')
  async loginAsso(
    @Body() LoginAssoDto: LoginAssoDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginAsso(LoginAssoDto);
  }
}
