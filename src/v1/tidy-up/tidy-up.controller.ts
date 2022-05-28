import { Controller, Get, Post } from '@nestjs/common';
import { TidyUpService } from './tidy-up.service';

@Controller()
export class TidyUpController {
  constructor(private readonly tidyUpService: TidyUpService) {}

  @Get()
  tidyUp(): string {
    return this.tidyUpService.execute();
  }
}
