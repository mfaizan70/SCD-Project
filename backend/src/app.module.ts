import { Module } from '@nestjs/common';
import { CareerModule } from './career/career.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CareerModule, AuthModule],
})
export class AppModule {}