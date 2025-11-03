import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsArray,
  Matches as MatchRegex,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name cannot exceed 30 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsOptional()
  @IsArray({ message: 'Tasks must be an array of ObjectIds' })
  @MatchRegex(/^[0-9a-fA-F]{24}$/, {
    each: true,
    message: 'Each task ID must be a valid MongoDB ObjectId',
  })
  tasks?: string[];
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

}
