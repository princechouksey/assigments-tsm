import { IsEmail, isEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  password: string;
}
export class LoginUserDto {
  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Name must be String' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  password: string;
}
