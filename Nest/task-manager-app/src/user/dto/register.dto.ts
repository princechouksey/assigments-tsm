import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsString({message:"Name must be String"})
    @IsNotEmpty({message:"Name must not Empty"})
    name:string;

    @IsString({message:"Name must be String"})
    @IsNotEmpty({message:"Name must not Empty"})
    @IsEmail()
    email:string

    @IsString({message:"Name must be String"})
    @IsNotEmpty({message:"Name must not Empty"})
    @MinLength(8,{message:"Password must be of length 8"})
    password:string;

}
