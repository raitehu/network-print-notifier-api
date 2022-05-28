import { Controller, Get, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';

@Controller()
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  postRegister(): string {
    return this.tweetService.execute();
  }
}
