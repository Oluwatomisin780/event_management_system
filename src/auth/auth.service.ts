import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

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
  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const checkPas = await bcrypt.compare(password, user.password);
    if (user && checkPas) {
      const { password, ...result } = user;

      return result;
    }
    throw new BadRequestException('Invalid user credentials');
  }

  async login(user: LoginUserInput) {
    const emailExist = await this.userService.findOne(user.email);
    if (!emailExist)
      throw new BadRequestException(`user with ${user.email} does not exist`);
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        id: emailExist.id,
        userType: emailExist.userType,
      }),
      user,
    };
  }

  async SignUp(createUserInput: CreateUserInput) {
    const user = await this.userService.findOne(createUserInput.email);
    if (user) {
      throw new BadRequestException(
        `user with ${createUserInput.email} already exist!!`,
      );
    }
    const password = await bcrypt.hash(createUserInput.password, 12);
    return this.userService.create({
      password: password,
      userType: createUserInput.userType,
      email: createUserInput.email,
    });
  }
}
