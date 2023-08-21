import { IsNotEmpty, IsString } from "class-validator";

export class CreateUser {
    @IsString()
    @IsNotEmpty({ message: "Todos os campos são obrigatórios"})
    username: string

    @IsString()
    @IsNotEmpty({ message: "Todos os campos são obrigatórios"})
    avatar: string
}