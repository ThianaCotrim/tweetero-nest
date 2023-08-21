import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTweet } from './DTOS/tweet.dto';
import { CreateUser } from './DTOS/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUser) {
      return this.appService.createUser(body)
  }

  @Post('tweets')
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: CreateTweet) {
      return this.appService.createTweet(body)
  }

  @Get('tweets')
  showTweets(@Query('page') page: number) {
    return this.appService.last15Tweets(page)
  }

  @Get('tweets/:username')
  userTweets(@Param('username') username: string){
    return this.appService.userTweet(username)
  }
}
