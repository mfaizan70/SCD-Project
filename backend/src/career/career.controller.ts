import { Controller, Post, Body } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post('recommend')
  recommend(@Body() body: any) {
    return this.careerService.recommend(body);
  }
}