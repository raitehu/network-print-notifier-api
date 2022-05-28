import { Injectable } from '@nestjs/common';

@Injectable()
export class TidyUpService {
  execute(): string {
    return 'Call tidy-up method.';
  }
}
