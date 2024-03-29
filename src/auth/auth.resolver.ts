import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/create-auth.input';

import {
  CreateUserInput,
  LoginUserInput,
} from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guard';

import { UseGuards } from '@nestjs/common';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => LoginResponse)
  // @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(loginUserInput);
  }
  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.SignUp(createUserInput);
  }
}
