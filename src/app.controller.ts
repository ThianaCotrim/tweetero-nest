import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTweet } from './DTOS/tweet';
import { CreateUser } from './DTOS/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/health")
  getHealth(): string {
    return this.appService.getHealth()
  }

  @Post("/sing-up")
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUser){
    return this.appService.createUser(body)
  }

  @Post("/tweets")
  @HttpCode(HttpStatus.CREATED)
  createTweet(@Body() body: CreateTweet){
    return this.appService.createTweet(body)
  }

  @Get("/tweets")
  Last15Tweets(@Query("page") page: number){
    return this.appService.last15Tweets(page)
  }

  @Get("/tweets/:username")
  userTweet(@Param("username") username: string){
    return this.appService.userTweet(username)
  }
}
