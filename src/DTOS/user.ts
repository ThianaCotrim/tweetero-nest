import { IsNotEmpty, IsString } from "class-validator";

export class CreateTweet {
    @IsString()
    @IsNotEmpty({ message: "Todos os campos são obrigatórios"})
    username: string

    @IsString()
    @IsNotEmpty({ message: "Todos os campos são obrigatórios"})
    tweet: string
}