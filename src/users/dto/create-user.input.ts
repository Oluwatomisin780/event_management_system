import { InputType, Int, Field } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  name: string;
  @Field()
  userType: UserType;
}

@InputType()
export class LoginUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
