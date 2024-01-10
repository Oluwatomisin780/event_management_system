import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import {
  CreateUserInput,
  LoginUserInput,
} from '../users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validate(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const checkPas = await bcrypt.compare(user.password, password);
    if (user && checkPas) {
      const { password, ...result } = user;

      return result;
    }
    throw new BadRequestException('Invalid user credentials');
  }

  async login(user: LoginUserInput) {
    const emailExist = await this.userService.findOne(user.email);
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        id: emailExist.id,
      }),
    };
  }

  async SignUp(user: CreateUserInput) {
    user = await this.userService.findOne(user.email);
    if (user)
      throw new BadRequestException(`user with ${user.email} already exist!!`);

    return this.userService.create({
      userType: user.userType,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
