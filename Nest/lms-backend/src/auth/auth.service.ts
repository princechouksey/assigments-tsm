import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(registerDto: RegisterDto)  {
    const { name, email, role, password, isActive } = registerDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('User Already exist');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.MEMBER,
        isActive: isActive ?? true,
      },
    });
    return {
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }


  async login(loginDto:LoginDto){
    const {email, password} = loginDto;
    const user = await this.prisma.user.findUnique({where:{email}})
    if(!user)throw new UnauthorizedException("Invalid email or password")
      const isPasswordValid  = await  bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new UnauthorizedException("Invalid email or password")
    
      if(!user.isActive)throw new UnauthorizedException('Account is inactive');

      const payload = { sub: user.id, email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload)
      return {
      message: 'Login successful',
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    }


  }
   // ------------------ Validate User (for JwtStrategy) ------------------
  async validateUser(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
