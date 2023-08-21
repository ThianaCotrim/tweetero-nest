import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from './DTOS/user';
import { CreateTweet } from './DTOS/tweet';

@Injectable()
export class AppService {

  private tweets = []
  private users = []

  constructor (){
    this.tweets= []
    this.users = []
  }

  getHello(): string {
    return "I'm okay!"
  }

  getHealth(): string {
    return "I'm okay!"
  }

  createUser (body: CreateUser){
    this.users.push(body)
  }

  createTweet (body: CreateTweet){
    const {username, tweet} = body
    const user = this.users.find((u) => u.username === username)
    if (!user) throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED)

    const tweeet = {username, tweet, avatar: user.avatar}
    console.log(this.tweets)
    this.tweets.push(tweeet)
  }

  last15Tweets (page: number){
    if (page === undefined || page === null) {
      page = 1
  }

    const pages = Number(page)

    if(pages < 1 ) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

    const first = (pages -1) * 15
    const last = first + 15
    const all = this.tweets.reverse()

    return all.slice(first, last)
  }

  userTweet (username: string){
    return this.tweets.filter(tweets => tweets.username === username)
  }
}
