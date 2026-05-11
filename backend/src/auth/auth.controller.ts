import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Iska matlab hai saare routes /auth se shuru honge
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. REGISTER ENDPOINT: POST http://localhost:3000/auth/register
  @Post('register')
  async register(@Body() signUpDto: any) {
    // Ye frontend se aane wala username aur password service ko bhej raha hai
    return this.authService.register(signUpDto.username, signUpDto.password);
  }

  // 2. LOGIN ENDPOINT: POST http://localhost:3000/auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK) // Login success par 200 OK status bhejne ke liye
  async login(@Body() loginDto: any) {
    // Ye service se JWT Token mangwa kar return karega
    return this.authService.login(loginDto.username, loginDto.password);
  }
}