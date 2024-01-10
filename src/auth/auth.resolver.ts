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
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }
  @Mutation(() => User)
  async signup(@Args('loginUserInput') createUserInput: CreateUserInput) {
    const user = await this.authService.SignUp(createUserInput);
  }
}
