import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/create-auth.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql.guard';
import {
  CreateUserInput,
  LoginUserInput,
} from '../users/dto/create-user.input';
import { User } from '../users/entities/user.entity';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.SignUp(createUserInput);
  }
}
