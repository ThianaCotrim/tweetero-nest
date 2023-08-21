import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUser } from './DTOS/user.dto';
import { CreateTweet } from './DTOS/tweet.dto';

@Injectable()
export class AppService {
  private tweets = []
  private users = []

  constructor(){
    this.tweets= []
    this.users = []
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: CreateUser){
    this.users.push(body)
  }

  createTweet(body: CreateTweet){
    const {username, tweet} = body
    const userfind = this.users.find((u) => u.username === username);
    if (!userfind) throw new HttpException("Not Authorized", HttpStatus.UNAUTHORIZED)

    const tweetObj = {username, tweet, avatar: userfind.avatar}

    this.tweets.push(tweetObj)
  }

  last15Tweets(page: number){
    if (page === undefined || page === null) {
      page = 1
    }
    const pageNumber = Number(page)

    if (pageNumber < 1) throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)

    const firstIndex = (pageNumber - 1) * 15
    const lastIndex = firstIndex + 15
    const allTweets = this.tweets.reverse()

    return allTweets.slice(firstIndex, lastIndex)
  }

  userTweet(username: string){
    return this.tweets.filter(tweets => tweets.username === username)
  }
}
