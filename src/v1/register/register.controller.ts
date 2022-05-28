import { Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get()
  postRegister(): string {
    return this.registerService.execute();
  }
}
