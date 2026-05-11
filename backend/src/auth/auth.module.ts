import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY_123', // Isay bad mein .env mein dalein ge
      signOptions: { expiresIn: '1h' }, // Token 1 ghante mein expire hoga
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}