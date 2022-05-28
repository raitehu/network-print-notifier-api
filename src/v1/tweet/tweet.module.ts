import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  imports: [],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
