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
import passport from 'passport';
//import { use } from 'passport';

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
    if (!emailExist)
      throw new BadRequestException(`user with ${emailExist} does not exist`);
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        id: emailExist.id,
      }),
    };
  }

  async SignUp(createUserInput: CreateUserInput) {
    const user = await this.userService.findOne(createUserInput.email);
    if (user) {
      throw new BadRequestException(`user with ${user.email} already exist!!`);
    }
    const password = await bcrypt.hash(createUserInput.password, 12);
    return this.userService.create({
      password: password,
      name: createUserInput.name,
      userType: createUserInput.userType,
      email: createUserInput.email,
    });
  }
}
