import { AppModule } from '../app.module';
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { RegisterModule } from './register/register.module';
import { TweetModule } from './tweet/tweet.module';
import { TidyUpModule } from './tidy-up/tidy-up.module';

const routes: Routes = [
  {
    path: '/v1',
    module: AppModule,
    children: [
      {
        path: '/register',
        module: RegisterModule,
      },
      {
        path: '/tweet',
        module: TweetModule,
      },
      {
        path: '/tidy-up',
        module: TidyUpModule,
      },
    ],
  },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    AppModule,
    RegisterModule,
    TweetModule,
    TidyUpModule,
  ],
})
export class V1Module {}
