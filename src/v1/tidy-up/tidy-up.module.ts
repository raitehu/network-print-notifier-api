import { Module } from '@nestjs/common';
import { TidyUpController } from './tidy-up.controller';
import { TidyUpService } from './tidy-up.service';

@Module({
  imports: [],
  controllers: [TidyUpController],
  providers: [TidyUpService],
})
export class TidyUpModule {}
