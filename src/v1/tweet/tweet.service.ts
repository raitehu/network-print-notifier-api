import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetService {
  execute(): string {
    return 'Call tweet method.';
  }
}
