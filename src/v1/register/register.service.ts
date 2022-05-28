import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  execute(): string {
    return 'Call register method.';
  }
}
